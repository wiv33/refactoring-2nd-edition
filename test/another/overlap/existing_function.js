const Mustache = require("./mustache.min");
module.exports = function(result) {
    var TypeInfo = {
        _component: function (type, key) {
            var result = {};
            switch (type) {
                case "T":
                case "text":
                    Object.assign(result, {
                        type: "text",
                        value: "텍스트"
                    });
                    break;
                case "I":
                case "img":
                    Object.assign(result, {
                        type: "img",
                        value: "이미지"
                    });
                    break;
                case "O":
                case "audio":
                    Object.assign(result, {
                        type: "audio",
                        value: "오디오"
                    });
                    break;
                case "V":
                case "video":
                    Object.assign(result, {
                        type: "video",
                        value: "비디오"
                    });
                    break;
            }
            return result[key];
        },
        _multi_items: function (type, key) {
            // 기본 형식
            var result = {
                type: "",
                value: "",
                dataSetRunner: "multiItem"
            };
            switch (type) {
                case "T":
                case "text":
                    Object.assign(result, {
                        type: "text",
                        value: "텍스트",
                        dataSetRunner: "text"
                    });
                    break;
                case "HP":
                case "img":
                    Object.assign(result, {
                        type: "img",
                        value: "이미지"
                    });
                    break;
                case "MO":
                case "audio":
                    Object.assign(result, {
                        type: "audio",
                        value: "오디오"
                    });
                    break;
                case "MY":
                case "video":
                    Object.assign(result, {
                        type: "video",
                        value: "비디오"
                    });
                    break;
            }
            return result[key];
        }
    };

    /* inner function 시작*/
    /**
     * 목록 생성 함수
     * return html: string
     */
    function listHtml(result) {
        function makeDate(date) {
            return [
                date.substring(0, 4),
                date.substring(4, 6),
                date.substring(6, 8)
            ].join("-") + " " + date.substring(8, 10) + ":" + date.substring(10, 12);
        }
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

    // 임의의 기사 템플릿 50개씩 추가 코드 삽입)
    return listHtml(result);
}


var photoArticleTemplate =
    '<div class="admin-mid-article2 drag droppable" title="{{list_title}}" data-id="{{{unique_id}}}" >' +
    '<a href="javascript:void(0)" class="media" ' +
    // ' onclick="windowPopFunc(\'{{{cmss_url}}}\')"' +
    // ' onclick="imgEditor(event,\'{{{unwrap_img_url}}}\')"' +

    ' onclick="clickArticleRelational(event, this);"' +
    ' ondragstart="dragArticleRelational(event, this);"' +
    ' ondragend="flagContenteditable(true)"' +

    ' data-id="{{{unique_id}}}" data-title="{{list_title}}" data-summary="{{summary}}"' +
    // ' data-thumb_img="{{hp_thumbnail_img}}"' +
    //     /* 아래 값들이 여러 개가 되어야 한다면, 기사 번호로 DB 조회나 for문에서 인덱스를 활용해서 HTML을 직접 생성해야한다. */
    // ' {{#unwrap_audio_url}} data-audio_url="{{{unwrap_audio_url}}}" {{/unwrap_audio_url}}' +
    // ' {{#unwrap_audio_desc}} data-audio_desc="{{{unwrap_audio_desc}}}" {{/unwrap_audio_desc}}' +
    // ' {{#unwrap_video_url}} data-video_url="{{{unwrap_video_url}}}" {{/unwrap_video_url}}' +
    // ' {{#unwrap_video_desc}} data-video_desc="{{{unwrap_video_desc}}}" {{/unwrap_video_desc}}' +
    // ' {{#unwrap_img_desc}} data-img_desc="{{{unwrap_img_desc}}}" {{/unwrap_img_desc}}' +
    // ' {{#unwrap_img_url}} data-img_url="{{{unwrap_img_url}}}" {{/unwrap_img_url}}' +
    //
    ' data-is_audio="{{{audio}}}"' +
    //
    // ' {{#unwrap_category}} data-category_code="{{code}}" data-category_name="{{{name}}}" {{/unwrap_category}}' +
    '>' +

    '{{#hp_thumbnail_img}}<span class="admin-img-mask-wrap{{#is_video}} mask-video{{/is_video}}"><img class="admin-mid-article-img ml-0"  src="{{hp_thumbnail_img}}" class="ml-0" alt="{{{list_title}}}" /></span>{{/hp_thumbnail_img}}' +
    '<div class="admin-media-body {{#hp_thumbnail_img}}relative{{/hp_thumbnail_img}}{{^hp_thumbnail_img}}ml-0{{/hp_thumbnail_img}}">' +
    '<h1 class="admin-mid-article-title2 {{^hp_thumbnail_img}}long{{/hp_thumbnail_img}} serif">' +
    '<span class="{{#audio}}admin-type-voice{{/audio}}">{{{list_title}}}</span>' +
    '</h1>' +
    '<p class="admin-mid-article-content2 {{^hp_thumbnail_img}}long{{/hp_thumbnail_img}}">{{{summary}}}</p>' +
    '<p class="admin-article-date">{{unwrap_date}}{{#unwrap_reporter}}, {{unwrap_reporter}}{{/unwrap_reporter}}</p>' +
    '</div>' +
    '</a>' +
    '</div>';