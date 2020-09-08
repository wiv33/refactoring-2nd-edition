const common = require("../default.test");
const text = require("./target_json");
const chai = common.chai;
const chaiAssert = common.chaiAssert;
const chaiExpected = common.chaiExpect

describe('JSON.parse testing', function () {

  it('should be occurred syntax error', function () {
    // chai.expect(JSON.parse(text.my_string), "my string parsing error")
    chaiAssert.strictEqual(typeof text.my_string, "string", "my text is string");
    // console.info(JSON.stringify(text.my_string));
    const regExpMatchArray = JSON.stringify(text.my_string).match(/(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/gi);
    chai.assert.strictEqual(regExpMatchArray.length, 3);
    let resText = text.my_string
    regExpMatchArray.forEach(s => {
      // console.info(s.replace(/\\"|"/g, '__`'));
      resText = resText.replace(s.replace(/\\"|"/g, '"'),
        s.replace(/"/g, "`"))
      console.info(resText)
    });

    console.info(JSON.parse(resText));
  });
});