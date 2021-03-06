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

                    if (!resultList["unwrap_" + typeMap[resultList.multi_items[i].type] + "_url"] &&
                        resultList.multi_items[i].url) {
                        resultList["unwrap_" + typeMap[resultList.multi_items[i].type] + "_url"] = resultList.multi_items[i].url;
                    }
                    if (!resultList["unwrap_" + typeMap[resultList.multi_items[i].type] + "_desc"] &&
                        resultList.multi_items[i].desc) {
                        resultList["unwrap_" + typeMap[resultList.multi_items[i].type] + "_desc"] = resultList.multi_items[i].desc;
                    }

                    if (resultList.multi_items[i].thumbnail === "Y") {
                        resultList.unwrap_img_url = resultList.multi_items[i].url;
                        resultList.unwrap_img_desc = resultList.multi_items[i].desc;
                    }
                }
            }
        }

        function makeCustom(resultList) {
            var result = "";
            var template = photoArticleTemplate();
            for (var y = 0; y < resultList.length; y++) {
                var tempList = resultList[y];
                tempList.unwrap_category = tempList.categories;
                tempList.unwrap_date = makeDate(tempList.service_date);
                tempList.unwrap_reporter = tempList.reporters[0] ? tempList.reporters[0].name : "";

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


var photoArticleTemplate = function(isOrder) {
    var cmss_url = isOrder ? "cms_url" : "cmss_url";
    return '<div class="admin-mid-article3 drag" title="{{list_title}}" data-id="{{{unique_id}}}" article_order="{{{article_order}}}">' +
        '<a href="javascript:void(0)" class="media" ' +

        ' ondragstart="dragArticleRelational(event, this);"' +

        ' data-id="{{{unique_id}}}" data-title="{{list_title}}" data-summary="{{summary}}"' +

        '>' +

        '{{#cms_thumbnail_img}}<span class="admin-img-mask-wrap"><img class="admin-mid-article-img ml-0"  src="{{{cms_thumbnail_img}}}" class="ml-0" alt="{{list_title}}" /></span>{{/cms_thumbnail_img}}' +
        '<div class="admin-media-body {{#cms_thumbnail_img}}relative{{/cms_thumbnail_img}}{{^cms_thumbnail_img}}ml-0{{/cms_thumbnail_img}}">' +
        '<h1 class="admin-mid-article-title2 {{^cms_thumbnail_img}}long{{/cms_thumbnail_img}} serif">' +
        '{{#audio}}<span class="admin-type-voice">{{{list_title}}}</span>{{/audio}}{{^audio}}<span>{{{list_title}}}</span>{{/audio}}' +
        '</h1>' +
        '<p class="admin-mid-article-content2 {{^cms_thumbnail_img}}long{{/cms_thumbnail_img}}">{{{summary}}}</p>' +
        '<p class="admin-article-date">{{unwrap_date}}{{#unwrap_reporter}}, {{unwrap_reporter}}{{/unwrap_reporter}}</p>' +
        '<input type="hidden" id="hidCmssUrl" value="{{{' + cmss_url + '}}}"><input type="hidden" id="hidUseYn" value="{{{use_yn}}}"></div>' +
        '<a href="#" class="btn btn-sm mr-5 plDetail" onclick="fncOpenArticleDetailPop(\'{{{' + cmss_url + '}}}\')">상세보기</a>' +
        '</a>' +
        '</div>';
};