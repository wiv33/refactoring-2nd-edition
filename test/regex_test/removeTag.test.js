const removeRag = require("./_000_removeTag");
const common = require("../default.test");
const chaiAssert = common.chaiAssert;
const chai = common.chai

describe('should be remove tag', () => {
  it('should be remove tag br and docs markdown', function () {
    const expected = ` my body is "steel" but i'm very quickly moving'', ' you are so beautiful '`
    const actual = removeRag("<br> my body is “steel” but i’m very quickly moving‘’, \u2018 you are so beautiful \u2019");
    chaiAssert.equal(actual, expected)

    chai.should().equal(expected, actual)

    chai.expect(expected).equal(actual)

  });
});