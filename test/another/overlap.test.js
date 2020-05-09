module.exports = class Overlap {

    _pageId = 0
    _globalTotalHeight = 0
    _searchFlag = false
    _isMore = false
    _isNotUpdateSearchKeywords = false;
    _appendRoot;
    _listWrapper

    constructor(appendRoot, listWrapper) {
        this._pageId = 0;
        this._globalTotalHeight = 0;
        this._searchFlag = this._isMore = false;
        this._appendRoot = appendRoot;
        this._listWrapper = listWrapper;
    }



    get pageId() {
        return this._pageId;
    }

    get totalHeight() {
        return this._globalTotalHeight;
    }

    get searchFlag() {
        return this._searchFlag;
    }

    get isMore() {
        return this._isMore;
    }

    get globalTotalHeight() {
        return this._globalTotalHeight;
    }

    get appendRoot() {
        return this._appendRoot;
    }

    set appendRoot(value) {
        this._appendRoot = value;
    }

    get listWrapper() {
        return this._listWrapper;
    }

    set listWrapper(value) {
        this._listWrapper = value;
    }

    set globalTotalHeight(value) {
        this._globalTotalHeight = value;
    }

    get isNotUpdateSearchKeywords() {
        return this._isNotUpdateSearchKeywords;
    }

    set isNotUpdateSearchKeywords(value) {
        this._isNotUpdateSearchKeywords = value;
    }

    set pageId(value) {
        this._pageId = value;
    }

    set totalHeight(value) {
        this._globalTotalHeight = value;
    }

    set searchFlag(value) {
        this._searchFlag = value;
    }

    set isMore(value) {
        this._isMore = value;
    }

    initArticleManagement(emptyList) {
        this._pageId = 0
        this.globalTotalHeight = 0;
        this._searchFlag = false;
        this._isMore = false;
        $(emptyList).empty();
    }

    makeParam() {
        return {
            startCount: pageId,
            categories: $categories.data("category"),
            startDate: $startDate.val(),
            endDate: $endDate.val(),
            keyword: $keyword.val(),
            sort: "asc"
        }
    }

    appendArticleListObject(isMore, slim) {
        if (!isMore) this.initArticleManagement()

        this.searchFlag = true;

        var url = "/article/management.do";
        var $progress = $("#loader-overlay");

        $progress.show();

        /* inner function 시작*/
        /**
         * 목록 생성 함수
         * return html: string
         */
        let listHtml = (result) => {

            /**
             * unwrap_img
             * unwrap_video
             * unwrap_audio
             * data 속성을 추가하는 함수
             * */
            let unwrapFields = (resultList) => {

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
            let makeCustom = (resultList) => {
                var result = "";
                for (var y = 0; y < resultList.length; y++) {
                    var tempList = resultList[y];
                    tempList.unwrap_category = tempList.categories;
                    tempList.unwrap_date = this.makeDate(tempList.service_date);
                    tempList.unwrap_reporter = tempList.reporters[0] ? tempList.reporters[0].name : "";
                    unwrapFields(tempList);

                    result += Mustache.to_html(photoArticleTemplate, tempList);
                }
                return result;
            }

            /**
             *   전체 HTML 생성
             * */
            let makeHtml = (result) => {
                var toHtml = "";
                toHtml += "<div class='"+ this.listWrapper +"'>";
                toHtml += makeCustom(result.RESULT_LIST);
                toHtml += "</div>";
                return toHtml;
            }

            return makeHtml(result);
        }

        let moveScroll = (slim) => {
            var lastHeight = $(this.listWrapper + ":last-child").height();
            this.globalTotalHeight += lastHeight ? lastHeight : 0;

            if (slim)
                $(slim.target).slimScroll({scrollTo: this.globalTotalHeight - lastHeight});
        }

        /* inner function 끝 */

        $.ajax({
            url: url,
            data: this.makeParam()
        }).then((result) => {
            console.log(result);
            $progress.hide();
            // append 로직 추가
            this.pageId += result.RESULT_LIST.length;
            // 임의의 기사 템플릿 50개씩 추가 코드 삽입)
            $(this.appendRoot).append(listHtml(result));

            moveScroll(slim);

            this.searchFlag = false;
            this.isNotUpdateSearchKeywords = true;
        }).fail(function (err) {
            console.log(err);
        }).always(function () {
            delayFunctionWrapper(initViewport, 300, viewPortInit);
        });
        var initViewport = null;
    }


    /**
     * 날짜 세팅 함수
     */
    makeDate(date, dateOnly) {
        var returnDate = [
            date.substring(0, 4),
            date.substring(4, 6),
            date.substring(6, 8)
        ].join("-");
        return dateOnly ? returnDate : returnDate + " " + date.substring(8, 10) + ":" + date.substring(10, 12);
    }
}
