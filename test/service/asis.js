//https://koreajoongangdaily.joins.com/data/popup/2020/05/06/samplePop.jpg


$("footer").append(
    '<div class="layer-popup layer-main" id="mainPopup" style="display:none;">\n' +
    '    <div class="dimmed"></div>\n' +
    '    <div class="popup-wrap">\n' +
    '        <div class="thumb">\n' +
    '            <div class="pc">\n' +
    '                <a href="/etc/sample"><img src="https://koreajoongangdaily.joins.com/data/popup/2020/05/06/samplePop.jpg" alt=""></a>\n' +
    '            </div>\n' +
    '            <div class="mobile">\n' +
    '                <a href="/etc/sample"><img src="https://koreajoongangdaily.joins.com/data/popup/2020/05/06/samplePop.jpg" alt=""></a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="button-wrap">\n' +
    '            <button type="button" onclick="closedPopup()" data-event="day">오늘 하루 보지 않기</button>\n' +
    '            <button type="button" onclick="closedPopup()" data-event="now">닫기</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
const ClosedPopup = {
    now: function () {
        nowClose()
    },
    day: function () {
        dayClose()
    }
}
function closedPopup() {
    ClosedPopup[this.dataset.event]();
}

function nowClose() {
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