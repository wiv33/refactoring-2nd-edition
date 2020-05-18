const SendModule = require("./sendBulk");
const common = require("../default.test");
const assert = common.assert;
const mocha = common.mocha;
const describe = common.describe;
const it = common.it;

describe(`벌크 전송 테스트`, () => {

    it(`4월 30일 ~ 5월 03일`, function (done) {
        let cnt = 20;

        const arr = Array.of(704656, 704654, 704652, 704650, 704637, 704621, 704619, 704614, 704611, 704608, 704607, 704598, 704563, 704551, 704546, 702819, 702601, 702590, 701468);
        sendWrap(done, cnt, arr)
    })

    it(`04일 `, function (done) {
        this.timeout(6000);

        let cnt = 48;
        const arr = Array.of(705426, 705421, 705418, 705417, 705411, 705409, 705404, 705395, 705392, 705390, 705385, 705384, 705368, 705354, 705341, 705340, 705304, 705303, 705299, 705292, 705255, 705225, 705094, 704999, 704661, 704659, 704658, 704655, 704653, 704647, 704646, 704638, 704636, 704633, 704617, 704556, 704554, 704547, 704528, 702615, 702606, 702577, 702563, 702556, 702527, 702502, 702496, 702495);
        sendWrap(done, cnt, arr)

    })

    it(`05일 `, function (done) {
        this.timeout(6000);
        let cnt = 39;

    });

    it(`06일 `, function (done) {
        this.timeout(6000);
        let cnt = 44;

    });

    it(`07일 `, function (done) {
        this.timeout(6000);
        let cnt = 66;

    });

    it(`08일 `, function (done) {
        this.timeout(6000);
        let cnt = 11;

    });

    it(`10일 `, function (done) {
        this.timeout(6000);
        let cnt = 27;

    });

    it(`11일 `, function (done) {
        this.timeout(6000);
        let cnt = 58;

    });

    it(`12일 `, function (done) {
        this.timeout(6000);
        let cnt = 54;

    });

    it(`13일 `, function (done) {
        this.timeout(6000);
        let cnt = 41;

    });

    it(`14일 `, function (done) {
        this.timeout(6000);
        let cnt = 53;

    });

})

function sendWrap(done, cnt, arr) {
    let totCnt = cnt;
    arr.forEach(v => {
        totCnt--;
        SendModule.send(v);
    });

    setTimeout(() => {
        assert.strictEqual(totCnt, 0, "is not zero.");
        done();
    }, 4000)
}