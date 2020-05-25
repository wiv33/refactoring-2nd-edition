function appendArticleOrderListObject2(isMore, slim, category) {
    if (!isMore) {
        initArticlOrdereManagement();
    }
    searchFlag1 = true;

    var param = {
        category: category
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

        function makeCustom(resultList) {
            var result = "";
            var template = photoArticleTemplate("isOrder");
            for (var y = 0; y < resultList.length; y++) {
                var tempList = resultList[y];
                tempList.custom_category = tempList.categories;
                tempList.custom_date = tempList.service_date;
                tempList.custom_reporter = tempList.custom_reporter;

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
        url: "/retrieveArticleInfo.do",
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
        }
        ;
        $("#plmPriorityWrap").append(objOrderedAticle);

        reorder();

        moveScroll(slim);

        searchFlag = false;
    }).fail(function (err) {
        console.log(err);
    }).always(function () {
    });
}