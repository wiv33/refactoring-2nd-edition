const assert = require("assert");
const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it

const axios = require("axios");

describe("## unescape test #", () => {
    const target = "Korea&apos;s top culture stories of 2019: A look back at why galbi-flavored fried chicken, Bong Joon-ho and, of course, BTS&apos; dominated the headlines this year";
    const expect = "Korea's top culture stories of 2019: A look back at why galbi-flavored fried chicken, Bong Joon-ho and, of course, BTS' dominated the headlines this year";

    let actual

    mocha.before(() => {
        actual = target.replace(/&apos;/gi, "'");
    })
    it("not equal target and expect", () => {
        assert.notStrictEqual(actual, target, "my body");
    })
    it("single quote", () => {
        assert.strictEqual(actual, expect, "is equal")
    })

    describe('Test Async suite', function () {
        this.timeout(2000);

        it('should be fail', function (done) {
            setTimeout(() => {
                assert.strictEqual(0, 0);
                done();
            }, 3000);
        });

        it('test axios', function (done) {
            const searchParam = {
                startCount: 0,
                startDate: "2020.01.12",
                endDate: "2020.05.01",
                sort: "asc"
            }
            axios.get("http://localhost:8060/article/management.do", {
                params: searchParam,
                headers: {
                    Cookie: "JSESSIONID=68C44FB8821218C14F2D0806DB9C77E9"
                }
            })
            .then(res => {
                console.log(res.data.RESULT_LIST);
                done();
            })
        });
    })
})