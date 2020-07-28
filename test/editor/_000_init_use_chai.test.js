const Timeline = require('./timeline');
const assert = require('../default.test').chaiAssert;
const expect = require('../default.test').chaiExpect;
const should = require('../default.test').chai.should();

describe('testInit', function () {

  it('should be not null', function () {
    const tl = Timeline.init();
    expect(tl.name).to.equal("PS")

    assert.equal(tl.name, "PS", 'tl name is `PS`')

    tl.name.should.be.a("string")
    tl.name.should.equal("PS")
  });
});