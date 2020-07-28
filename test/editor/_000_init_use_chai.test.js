const Timeline = require('./timeline');
const assert = require('../default.test').chaiAssert;
const expect = require('../default.test').chaiExpect;

describe('testInit', function () {

  it('should be not null', function () {
    const tl = Timeline.init();
    expect(tl.name).to.equal("PS")
    assert.equal(tl.name, "PS", 'tl name is `PS`')
  });
});