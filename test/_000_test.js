const Province = require("./app.test");
const assert = require("assert")
const expect = require("chai").expect

describe('province', () => {
    let asia
    beforeEach(() => asia = new Province({name:"hello"}))

    it('shortfall', () => {
        assert.equal(asia._name, "hello");
    })
    it('shortfall', () => {
        expect(asia.name).equal("hello")
    })
})