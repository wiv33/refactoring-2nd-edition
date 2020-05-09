// 무한로딩용
var pageId = 0;
var globalTotalHeight = 0;
var searchFlag, isMore, isNotUpdateSearchKeywords = true;


function initArticleManagement() {
    pageId = 0;
    globalTotalHeight = 0;

    searchFlag = false;
    isMore = false;
    $('.admin-article-wrap').empty();
}

function appendArticleListObject(isMore, slim) {
    // console.log(isMore);
    // validate
    if (!isMore) {
        initArticleManagement();
    }
    searchFlag = true;

    var param = {
        startCount: pageId,
        categories: $categories.data("category"),
        startDate: $startDate.val(),
        endDate: $endDate.val(),
        keyword: $keyword.val(),
        sort: "asc"
    };

    var url = "/article/management.do";

    var $progress = $("#loader-overlay");
    $progress.show();


    /* inner function 시작*/
    /**
     * 목록 생성 함수
     * return html: string
     */
    function listHtml(result) {

        /**
         * unwrap_img
         * unwrap_video
         * unwrap_audio
         * data 속성을 추가하는 함수
         * */
        function unwrapFields(resultList) {

            if (resultList.multi_items.length > 0) {
                // resultList.unwrap_img_url = resultList.multi_items[0].url;
                // resultList.unwrap_img_desc = resultList.multi_items[0].desc;

                for (var i = 0; i < resultList.multi_items.length; i++) {

                    var _multiType = TypeInfo._multi_items(resultList.multi_items[i].type, "type");
                    if (_multiType === "audio") {
                        resultList.audio = "True";
                    }

                    if (_multiType === "video") {
                        resultList.is_video = "True";
                    }

                    if (!resultList["unwrap_" + _multiType + "_url"] &&
                        resultList.multi_items[i].url) {
                        resultList["unwrap_" + _multiType + "_url"] = resultList.multi_items[i].url;
                    }
                    if (!resultList["unwrap_" + _multiType + "_desc"] &&
                        resultList.multi_items[i].desc) {
                        resultList["unwrap_" + _multiType + "_desc"] = resultList.multi_items[i].desc;
                    }

                    // console.log(resultList.multi_items[i]);
                    if (resultList.multi_items[i].thumbnail === "Y") {
                        resultList.unwrap_img_url = resultList.multi_items[i].url;
                        resultList.unwrap_img_desc = resultList.multi_items[i].desc;
                    }
                }
            }
        }

        /**
         *
         * */
        function makeCustom(resultList) {
            var result = "";
            for (var y = 0; y < resultList.length; y++) {
                var tempList = resultList[y];
                tempList.unwrap_category = tempList.categories;
                tempList.unwrap_date = makeDate(tempList.service_date);
                tempList.unwrap_reporter = tempList.reporters[0] ? tempList.reporters[0].name : "";
                unwrapFields(tempList);

                result += Mustache.to_html(photoArticleTemplate, tempList);
            }
            return result;
        }

        /**
         *   전체 HTML 생성
         * */
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
        globalTotalHeight += lastHeight ? lastHeight : 0;

        if (slim)
            $(slim.target).slimScroll({scrollTo: globalTotalHeight - lastHeight});
    }

    $.ajax({
        url: url,
        data: param
    }).then(function (result) {
        console.log(result);
        $progress.hide();
        // append 로직 추가
        pageId += result.RESULT_LIST.length;
        // 임의의 기사 템플릿 50개씩 추가 코드 삽입)
        $(".admin-article-wrap").append(listHtml(result));

        moveScroll(slim);

        searchFlag = false;
        isNotUpdateSearchKeywords = true;
    }).fail(function (err) {
        console.log(err);
    }).always(function () {
        delayFunctionWrapper(initViewport, 300, viewPortInit);
    });
    var initViewport = null;
}

