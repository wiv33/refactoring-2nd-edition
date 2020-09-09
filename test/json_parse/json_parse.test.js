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
    // console.log(text.my_string)
    regExpMatchArray.forEach(s => {
      // console.log(text.my_string.includes(s.replace(/\\"|"/g, "\"")));
      const searchValue = s.replace(/\\"|"/g, "\"");
      text.my_string = text.my_string.replace(searchValue, searchValue.replace(/"/g, "'"));
    });
    const regExpMatchArray1 = text.my_string.match(/(?:"dataTitle":"*).*?(?:",)/gi);
    regExpMatchArray1.forEach(s => {
      const s1 = s.substr(13, s.length - 15);
      text.my_string = text.my_string.replace(s1, s1.replace(/"/g, "&#34;"))
    })

    console.log(text.my_string);
    console.log(JSON.parse(text.my_string));
    chai.assert.strictEqual(typeof JSON.parse(text.my_string), "object")
  });

  it('should parsing test', function () {
    JSON.parse(text.my_str_2.replace(/"/g, "'"));
  });
});