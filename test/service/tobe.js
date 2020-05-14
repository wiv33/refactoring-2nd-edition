let popDiv =
    function ({link: link, img: img, layerkinds: layerkinds}) {
        return '<div class="layer-popup layer-main" id="mainPopup" style="display:none;">\n' +
            '    <div class="dimmed"></div>\n' +
            '    <div class="popup-wrap">\n' +
            '        <div class="thumb">\n' +
            '            <div class="pc">\n' +
            '                <a href="' + link + '"><img src="' + img + '" alt=""></a>\n' +
            '            </div>\n' +
            '            <div class="mobile">\n' +
            '                <a href="' + link + '"><img src="' + img + '" alt=""></a>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="button-wrap">\n' +
            '            <button type="button" onclick="closedPopup(this)" data-layerkinds="' + layerkinds + '">오늘 하루 보지 않기</button>\n' +
            '            <button type="button" onclick="closedPopup(this)" data-layerkinds="' + layerkinds + '">닫기</button>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
    }

let win
const ClosedPopup = {
    mainPopup: function (param) {
        $("#mainPopup").hide();
        this.day(param);
    },
    mainWindowPopup: function (param) {
        this.day(param);
        win.close();
    },
    day: function (param) {
        setCookie(param.layerkinds, 'Y', 1);
    }
}

function closedPopup(target) {
    ClosedPopup[target.dataset.layerkinds](target);
}

$("footer").append(
    popDiv({
        link: "/etc/sample",
        img: "https://koreajoongangdaily.joins.com/data/popup/2020/05/06/samplePop.jpg",
        layerKinds: 'mainPopup'
    })
);

(function () {
    win = window.open('about:blank', 'another article', 'width=400,height=400');
    win.document.write(popDiv({
        link: 'https://koreajoongangdaily.joins.com/2020/05/14/etc/offer-job-job-offer/20200514094600361.html',
        img: 'https://koreajoongangdaily.joins.com/data/popup/2020/05/14/popup_200514.jpg',
        layerKinds: 'mainWindowPopup'
    }));
})();


function popupClose() {
    $("#mainPopup").hide();
}

function dayClose() {
    setCookie('mainPopup', 'Y', 1);
    $("#mainPopup").hide();
}

//쿠키설정
function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';'
}


//쿠키 불러오기
function getCookie(name) {
    var obj = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + obj.length);
        if (document.cookie.substring(x, y) == obj) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}

$(function () {
    if (getCookie("mainPopup") != "Y") {
        $("#mainPopup").show();
    }
});