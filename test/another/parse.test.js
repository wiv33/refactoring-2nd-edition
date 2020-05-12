const assert = require("assert");
const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it

describe("## unescape test #", () => {
    const target = "Korea&apos;s top culture stories of 2019: A look back at why galbi-flavored fried chicken, Bong Joon-ho and, of course, BTS&apos; dominated the headlines this year";
    const expect = "Korea's top culture stories of 2019: A look back at why galbi-flavored fried chicken, Bong Joon-ho and, of course, BTS' dominated the headlines this year";

    let actual

    mocha.before(() => {
        actual = target.replace(/&apos;/gi, "'");
    })
    it("not equal target and expect", () => {
        assert.notStrictEqual(actual === target, "my body");
    })
    it("single quote", () => {
        assert.ok(expect === actual, "parse OK")
    })
})