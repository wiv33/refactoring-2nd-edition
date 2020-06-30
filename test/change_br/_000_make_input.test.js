const common = require("../default.test");
const assert = common.assert;
// const mocha = common.mocha;
const describe = common.describe;
const it = common.it;
const data = require("./br_text_data")();
// const _ = require("lodash");

describe('should be remove <br> in input text', function () {

  it('should print input text', function () {
    assert.notStrictEqual(data, data.replace("<br>" , ""));
  });
});