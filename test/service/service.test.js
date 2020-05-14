const common = require("../default.test");
const assert = common.assert;
const mocha = common.mocha;
const describe = common.describe;
const it = common.it;
const beforeEach = mocha.beforeEach;
const before = mocha.before;

const afterEach = mocha.afterEach;

const func = require("./add_window");
const asis = func.asis;
const tobe = func.tobe;

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


    it('')
});