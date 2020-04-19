const Province = require("./app.test");
const assert = require("assert")
const chai = require("chai")

describe('tests', () => {
    it('shortfall', () => {
        const asia = new Province({name:"hello"})
        assert.equal(asia._name, "hello");
    })
})

describe('province', () => {
    it('shortfall', () => {
        const asia = new Province({name:"hello"})
        chai.expect(asia.name).equal("hello")
    })
})