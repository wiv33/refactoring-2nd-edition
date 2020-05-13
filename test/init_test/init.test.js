const assert = require("assert")
const mocha = require("mocha");
const describe = mocha.describe
const it = mocha.it

const first = require("./first");
const sum = first.sum;

describe('## init test', () => {
    let actual
    let expected
    it('first sum', () => {
        actual = sum(3, 7);
        expected = 10;
        assert.strictEqual(actual, expected, "result is 10")
    })

    it('expect 8 + 8 = 16', () => {
        actual = sum(8, 8);
        expected = 16
        assert.strictEqual(actual, expected , "result is 16")
    })
})