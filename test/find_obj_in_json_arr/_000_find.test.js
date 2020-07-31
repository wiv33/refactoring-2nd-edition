const common = require("../default.test");
const chaiAssert = common.chaiAssert;
const describe = common.describe;
const it = common.it;

const extract_lodash = require('./extract_by_lodash');
const extract_plain = require("./extract_plain");

describe('extract obj', function () {
  const dataJson = require('./data_json');
  const expected = require('./expected_json').data();

  it('should be find vodTemplate', function () {
    chaiAssert.exists(dataJson, "should be exists data json");
    chaiAssert.exists(expected, "should be exists expected ");
  });

  describe('extract VodTemplate', function () {
    it(`should be extract VodTemplate in dataJson by 'lodash'`, function () {
      chaiAssert.deepEqual(extract_lodash(dataJson), expected);
    });

    it(`should be extract VodTemplate in dataJson by 'for result'`, function () {
      chaiAssert.deepEqual(extract_plain(dataJson), expected);
    });
  });

});