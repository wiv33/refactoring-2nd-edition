// 무한로딩용
var pageId1 = 0;
var totalHeight1 = 0;
var searchFlag1, isMore1, isNotUpdateSearchKeywords = true;


function initArticlOrdereManagement() {
    pageId1 = 0;
    totalHeight1 = 0;

    searchFlag1 = false;
    isMore1 = false;
    $('#plmPriorityWrap').empty();
}

function appendArticleOrderListObject(isMore, slim, category) {
    if (!isMore) {
        initArticlOrdereManagement();
    }
    searchFlag1 = true;

    var param = {
        startCount: pageId1,
        categories: category,
        startDate: $('#date_start').val().replace(/\-/gi, "."),
        endDate: $('#date_end').val().replace(/\-/gi, "."),
        sort: "asc"
    };

    console.log(param);

    $("#loader-overlay").show();

    /* inner function 시작*/
    function listHtml(result) {

        function makeDate(date) {
            return [
                date.substring(0, 4),
                date.substring(4, 6),
                date.substring(6, 8)
            ].join("-") + " " + date.substring(8, 10) + ":" + date.substring(10, 12);
        }

        function addCustom(resultList) {

            if (resultList.multi_items.length > 0) {

                for (var i = 0; i < resultList.multi_items.length; i++) {

                    if (resultList.multi_items[i].type === "MO") {
                        resultList.audio = "True";
                    }

                    if (!resultList["custom_" + typeMap[resultList.multi_items[i].type] + "_url"] &&
                        resultList.multi_items[i].url) {
                        resultList["custom_" + typeMap[resultList.multi_items[i].type] + "_url"] = resultList.multi_items[i].url;
                    }
                    if (!resultList["custom_" + typeMap[resultList.multi_items[i].type] + "_desc"] &&
                        resultList.multi_items[i].desc) {
                        resultList["custom_" + typeMap[resultList.multi_items[i].type] + "_desc"] = resultList.multi_items[i].desc;
                    }

                    if (resultList.multi_items[i].thumbnail === "Y") {
                        resultList.custom_img_url = resultList.multi_items[i].url;
                        resultList.custom_img_desc = resultList.multi_items[i].desc;
                    }
                }
            }
        }

        function makeCustom(resultList) {
            var result = "";
            var template = photoArticleTemplate();
            for (var y = 0; y < resultList.length; y++) {
                var tempList = resultList[y];
                tempList.custom_category = tempList.categories;
                tempList.custom_date = makeDate(tempList.service_date);
                tempList.custom_reporter = tempList.reporters[0] ? tempList.reporters[0].name : "";

                addCustom(tempList);
                result += Mustache.to_html(template, tempList);
            }
            return result;
        }

        function makeHtml(result) {
            var toHtml = "";
            toHtml += "<div class='image-scroll-wrapper'>";
            toHtml += makeCustom(result.RESULT_LIST);
            toHtml += "</div>";
            return toHtml;
        }

        return makeHtml(result);
    }

    function moveScroll(slim) {
        var lastHeight = $(".image-scroll-wrapper:last-child").height();
        totalHeight += lastHeight ? lastHeight : 0;

        if (slim)
            $(slim.target).slimScroll({scrollTo: totalHeight - lastHeight});
    }

    /* inner function 끝 */

    $.ajax({
        url: "/article/management.do",
        data: param
    }).then(function (result) {
        $("#loader-overlay").hide();
        // append 로직 추가

        result.RESULT_LIST = result.RESULT_LIST.filter(article => parseInt(article.article_order) < 100000);
        if ($categories.data('category') === '000001') { // 메인
            result.RESULT_LIST = result.RESULT_LIST.filter(article => parseInt(article.article_order) < 11);
            gMainFirstArticle = result.RESULT_LIST.filter(article => parseInt(article.article_order) === 1);
            result.RESULT_LIST = result.RESULT_LIST.filter(article => parseInt(article.article_order) !== 1);
        }
        ;
        result.RESULT_LIST.sort(function (a, b) {
            return a.article_order - b.article_order;
        });

        console.log(result.RESULT_LIST);
        pageId += result.RESULT_LIST.length;

        // 임의의 기사 템플릿 50개씩 추가 코드 삽입)
        $("#plmPriorityWrap").append(listHtml(result));

        var objOrderedAticle = $("#plmPriorityWrap").children().find(".admin-mid-article3");
        objOrderedAticle.addClass('dropped');
        objOrderedAticle.removeClass('drag');
        objOrderedAticle.find(".plDetail").remove();
        objOrderedAticle.attr('style', 'width: auto; height: 98px; bottom: auto; position: relative; left: 0px; top: 0px;');
        // // 해당 기사 인덱스 추가
        objOrderedAticle.append('<span class="item_num"></span>');
        // // 해당 기사 삭제버튼 추가
        $('<button class="btn trash-btn"></button>').appendTo(objOrderedAticle);
        $("#plmPriorityWrap").empty();
        if (result.RESULT_LIST.length < 1) {
            //$('#plmPriorityWrap').append('<div class="admin-mid-article3 dropped" title="" id="firstInitDropDiv"></div>');
        };

        $("#plmPriorityWrap").append(objOrderedAticle);

        reorder();

        moveScroll(slim);

        searchFlag = false;
    }).fail(function (err) {
        console.log(err);
    }).always(function () {
    });
}