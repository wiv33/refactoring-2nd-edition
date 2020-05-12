// 무한로딩용
var pageId = 0;
var totalHeight = 0;
var searchFlag, isMore;
/* 첫 번째 방식 */
class ArticleListManager {
    constructor(param) {
        this._startCount = param.pageId || 0;
        this._totalHeight = param.totalHeight || 0;
        this._targetWrapper = param.targetWrapper;
        this._scollWrapper = param.scrollWrapper || 'image-scroll-wrapper';
        this._slim = param.slim
        this._searchFlag = false;
        this._isMore = false;
    }

    initVariable() {
        this._startCount = 0;
        this._totalHeight = 0;
        this._searchFlag = false;
        this._isMore = false;
        $(this._targetWrapper).empty();
    }

    listHtml(result) {
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
                        resultList["custom_"+ typeMap[resultList.multi_items[i].type] + "_url"] = resultList.multi_items[i].url;
                    }
                    if (!resultList["custom_" + typeMap[resultList.multi_items[i].type] + "_desc"] &&
                        resultList.multi_items[i].desc) {
                        resultList["custom_"+ typeMap[resultList.multi_items[i].type] + "_desc"] = resultList.multi_items[i].desc;
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

        function makeHtml(result, scrollWrapper) {
            var toHtml = "";
            toHtml += "<div class='"+ scrollWrapper +"'>";
            toHtml += makeCustom(result.RESULT_LIST);
            toHtml += "</div>";
            return toHtml;
        }

        return makeHtml(result, this._scollWrapper);
    }


    ajaxAfterFunc(param) {

        var moveScroll = (slim, scrollWrapper) => {
            var lastHeight = $(scrollWrapper + ":last-child").height();
            this._totalHeight += lastHeight ? lastHeight : 0;

            if (slim)
                $(slim.target).slimScroll({scrollTo: this._totalHeight - lastHeight});
        }

        $.ajax({
            url: param.url,
            data: param.data
        }).then((result) => {
            $("#loader-overlay").hide();
            param.after.apply(result)

            moveScroll(slim, this._scollWrapper);
            searchFlag = false;
        }).fail(function (err) {
            console.log(err);
        }).always(function () {

        });
    }
}
/* === */
/* 두 번째 방식 */
var ArticleManager = {
    searchList: {
        pageId: {
            value:0,
            INIT: 0
        },
        totalHeight: {
            value: 0,
            INIT: 0
        },
        searchFlag: {
            value: false,
            INIT: false
        },
        isMore: {
            value: false,
            INIT: false
        }
    },
    orderList: {
        pageId: {
            value:0,
            INIT: 0
        },
        totalHeight: {
            value: 0,
            INIT: 0
        },
        searchFlag: {
            value: false,
            INIT: false
        },
        isMore: {
            value: false,
            INIT: false
        },
        isNotUpdateSearchKeywords: {
            value: true,
            INIT: true,
        }
    },

    initVariable(data, targetWrapper) {
        data.getOwnPropertyNames(v => v.value = v.INIT)
        $(targetWrapper).empty();
    }
}
/* ==== */
function initArticleManagement() {
    pageId = 0;
    totalHeight = 0;

    searchFlag = false;
    isMore = false;
    $('#plmArticleWrap').empty();
}

function appendArticleListObject(isMore, slim, category) {
    console.log(category);
    if (!isMore) {
        initArticleManagement();
    }
    searchFlag = true;


    console.log(param);

    var url = "/article/management.do";

    $("#loader-overlay").show();

    /* inner function 끝 */
    var param = {
        url: "/article/management.do",
        slim: this.slim,
        targetWrapper: "#plmArticleWrap",
        param: {
            startCount: pageId,
            categories: category,
            sort: "asc",
            startDate: $('#date_start').val().replace(/\-/gi, "."),
            endDate: $('#date_end').val().replace(/\-/gi, ".")
        },
    }
    function after(result) {
        $("#plmArticleWrap").append(listHtml(result));

        $("#plmArticleWrap").find(".admin-mid-article3").on("click", function (e) {
            $("#plmArticleWrap").find(".admin-mid-article3").removeClass("choiced");
            $(this).addClass("choiced");
        });

        // 첫번쨰 아티클 리스트의 기사만 드래그될수 있게 설정
        $(".drag").draggable({
            connectToSortable: '.connectedSortable',
            helper: "clone",
            revert: "invalid",
            cursor: "move"
        });
    }

    new ArticleListManager(param)

    $.ajax({
        url: "/article/management.do",
        data: param
    }).then(function (result) {
        console.log(result);
        $("#loader-overlay").hide();
        // append 로직 추가
        pageId += result.RESULT_LIST.length;

// 임의의 기사 템플릿 50개씩 추가 코드 삽입)
        after();

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