const common = require("../default.test");
const assert = common.assert;
const mocha = common.mocha;
const describe = common.describe;
const it = common.it;
const before = mocha.before;

const afterEach = mocha.afterEach;

const add_window = require("./add_window");
const asis = add_window.asis;
const tobe = add_window.tobe;
const another = add_window.asis_another;

describe('function parameterizing', () => {
    let asis_str, tobe_str;

    before('init strings', () => {
        asis_str = asis();
    })

    afterEach('remove settings', () => {
        tobe_str = "";
    })

    it('asis equal tobe', () => {
        tobe_str = tobe({
            link: "/etc/sample",
            img: "https://koreajoongangdaily.joins.com/data/popup/2020/05/06/samplePop.jpg"
        })

        assert.strictEqual(asis_str, tobe_str, "is Equal");
    })


    it('another not equals asis', () => {
        const actual = another();
        assert.notStrictEqual(actual, asis_str);
    })

    it('another equal tobe_func', () => {
        const expect = another();
        const actual = tobe({
            link: 'https://koreajoongangdaily.joins.com/2020/05/14/etc/offer-job-job-offer/20200514094600361.html',
            img: 'https://koreajoongangdaily.joins.com/data/popup/2020/05/14/image.png'
        });

        assert.strictEqual(actual, expect, 'another() equal tobe()');
    })


    it('modified click event listener', () => {
        const actual = tobe({
            link: 'https://koreajoongangdaily.joins.com/2020/05/14/etc/offer-job-job-offer/20200514094600361.html',
            img: 'https://koreajoongangdaily.joins.com/data/popup/2020/05/14/image.png',
        });
    })
});