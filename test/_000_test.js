const Province = require("./app.test");
const assert = require("assert")

describe('tests', () => {
    it('shortfall', () => {
        const asia = new Province({name:"hello"})
        assert.equal(asia._name, "hello");
    })
})