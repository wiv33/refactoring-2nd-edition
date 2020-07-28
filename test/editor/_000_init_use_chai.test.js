const InitTestObj = require('./timeline');
const assert = require('../default.test').chaiAssert;
const expect = require('../default.test').chaiExpect;
const should = require('../default.test').chai.should();

describe('testInit by chai', function () {

  it('how to use chai test', function () {
    const tl = InitTestObj.init({name: "PS", body: "created"});

    // tag::expect()[]
    expect(tl).to.have.property("name")
    expect(tl).to.have.property("body")
    // expect(tl).to.have.property("body2")
    expect(tl.name).to.equal("PS")
    expect(tl.body).to.eq("created")
    // end::expect()[]

    // tag::assert[]
    assert.equal(tl.name, "PS", 'tl name is `PS`')
    assert.equal(tl.body, "created", `${tl.body + " body is 'created'"}`)
    // end::assert[]

    // tag::should[]
    tl.name.should.be.a("string")
    tl.name.should.equal("PS")
    // tl.name.should.equal("PS2")

    tl.body.should.equal("created");
    tl.body.should.not.equal("Created", `${tl.body + " is not 'Created'"}`);
    // end::should[]


  });

});