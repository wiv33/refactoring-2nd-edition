const common = require("../default.test");
const chaiAssert = common.chaiAssert;
const Data = require("./arr_data");

describe('arr function tests', function () {
  const expected = ['name', 'gBirth', 'address', 'number', 'pNumber', 'email', 'itemType', 'itemQuantitiy', 'participationNumber', 'story', 'agree']

  it('should be equals array', function () {
    const exists = Data.exists();
    const obj = Data.obj();
    let actual = Object.getOwnPropertyNames(obj)
                       .filter(f => exists.includes(f));

    chaiAssert.equal(actual.length, expected.length, "not equal array");
  });
});