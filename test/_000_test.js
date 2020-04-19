const Province = require("./app.test");
const assert = require("assert")
const expect = require("chai").expect

describe('tests', () => {
    it('shortfall', () => {
        const asia = new Province({name:"hello"})
        assert.equal(asia._name, "hello");
    })
})

describe('province', () => {
    it('shortfall', () => {
        const asia = new Province({name:"hello"})
        expect(asia.name).equal("hello")
    })
})