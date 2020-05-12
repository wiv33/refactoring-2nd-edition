const assert = require("assert");
const describe = require("mocha").describe;
const it = require("mocha").it

describe("## unescape test", () => {
    it("single quote", () => {
        const target = "Korea&apos;s top culture stories of 2019: A look back at why galbi-flavored fried chicken, Bong Joon-ho and, of course, BTS&apos; dominated the headlines this year";
        const expectStr = target.replace(/&apos;/gi, "'");

        assert.ok(expectStr === "Korea's top culture stories of 2019: A look back at why galbi-flavored fried chicken, Bong Joon-ho and, of course, BTS' dominated the headlines this year", "parse OK")
    })
})