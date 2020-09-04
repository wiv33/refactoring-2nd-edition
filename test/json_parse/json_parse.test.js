const common = require("../default.test");
const text = require("./target_json");
const chaiAssert = common.chaiAssert;
const chaiExpected = common.chaiExpect

describe('JSON.parse testing', function () {

  it('should be occurred syntax error', function () {
    chaiAssert.strictEqual(typeof text.my_text, "object")
  });
});