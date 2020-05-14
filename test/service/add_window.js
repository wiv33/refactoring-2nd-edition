/*
    접근: 내가 생각하는 핵심은 div tag를 만드는 string이다.

    - layer popup 과 동일한 format의 window popup을 띄워라
        * link 와 이미지가 바뀌어야 한다.

    1. 출력을 확인한다. *
    2. 똑같은 함수를 만든다. *
    3. 출력이 1번 하고 똑같은지 확인한다. *

A: 기본, B: 추가
    4.
 */

module.exports = {
    asis() {
        return '<div class="layer-popup layer-main" id="mainPopup" style="display:none;">\n' +
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
            '            <button type="button" onclick="dayClose()">오늘 하루 보지 않기</button>\n' +
            '            <button type="button" onclick="popupClose()">닫기</button>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
    },
    asis_another() {
        return '<div class="layer-popup layer-main" id="mainPopup" style="display:none;">\n' +
            '    <div class="dimmed"></div>\n' +
            '    <div class="popup-wrap">\n' +
            '        <div class="thumb">\n' +
            '            <div class="pc">\n' +
            '                <a href="https://koreajoongangdaily.joins.com/2020/05/14/etc/offer-job-job-offer/20200514094600361.html"><img src="https://koreajoongangdaily.joins.com/data/popup/2020/05/14/image.png" alt=""></a>\n' +
            '            </div>\n' +
            '            <div class="mobile">\n' +
            '                <a href="https://koreajoongangdaily.joins.com/2020/05/14/etc/offer-job-job-offer/20200514094600361.html"><img src="https://koreajoongangdaily.joins.com/data/popup/2020/05/14/image.png" alt=""></a>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="button-wrap">\n' +
            '            <button type="button" onclick="dayClose()">오늘 하루 보지 않기</button>\n' +
            '            <button type="button" onclick="popupClose()">닫기</button>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
    },

    tobe({link: link, img: img}) {
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
            '            <button type="button" onclick="dayClose()">오늘 하루 보지 않기</button>\n' +
            '            <button type="button" onclick="popupClose()">닫기</button>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
    },

    add_func({link: link, img: img, close: close}) {
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
            '            <button type="button" onclick="dayClose()">오늘 하루 보지 않기</button>\n' +
            '            <button type="button" onclick="popupClose()">닫기</button>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
    }
};
