const assert = require("assert");
const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;

const extractKey = require("./extractKey");

describe('# 유튜브 uri 조합', () => {
    let thumbBase = "https://img.youtube.com/vi/{{key}}/hqdefault.jpg"

    let uri
    let watch

    let expected = `https://img.youtube.com/vi/k-senVR0q8M/hqdefault.jpg`
    let actual

    let expectedKey
    let actualKey

    before(() => {
        uri = `https://www.youtube.com/embed/k-senVR0q8M?list=PL7FKPrjfmaNx4O5PzFuXm3RTAAgEyKjds?wmode=transparent`;
        watch = `https://www.youtube.com/watch?v=G4tvbcevOH8&t=9s`
    })

    it('parameter 있을 때', () => {
        expectedKey = `k-senVR0q8M`
        actualKey = extractKey(uri);
        assert.strictEqual(actualKey, expectedKey, "actual key equal extract key")
    })

    it('uri 전체 조합 가져오기', () => {
        actual = thumbBase.replace("{{key}}", extractKey(uri));
        assert.strictEqual(actual, expected, "uri equal")
    })

    it('should be extracted uri in watch', function () {
        actualKey = extractKey(watch);
        assert.strictEqual(actualKey, expected);
    });
})

