const assert = require("assert");
const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;

describe('# 유튜브 id 추출', () => {
    let thumbBase = "https://img.youtube.com/vi/{{key}}/hqdefault.jpg"

    let youtubeKey
    let expected = `https://img.youtube.com/vi/k-senVR0q8M/hqdefault.jpg`
    let uri
    let expectedKey
    before(() => {
        uri = `https://www.youtube.com/embed/k-senVR0q8M?list=PL7FKPrjfmaNx4O5PzFuXm3RTAAgEyKjds?wmode=transparent`;
        youtubeKey = `k-senVR0q8M`
    })

    it('parameter 있을 때', () => {
        expectedKey = uri.replace("{{key}}", uri.substr(uri.lastIndexOf("/") + 1, uri.lastIndexOf("/") + 12));
        assert.strictEqual(youtubeKey, expectedKey, "actual key equal extract key")
    })
})