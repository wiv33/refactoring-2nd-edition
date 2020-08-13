const Province = require("./app.test");
const mocha = require("mocha");
const assert = require("assert")
const expect = require("chai").expect
const axios = require("axios");

describe('province', () => {
    let asia
    mocha.beforeEach(() => asia = new Province({name:"hello"}))

    it('shortfall', () => {
        assert.strictEqual(asia._name, "hello");
    })
    it('shortfall', () => {
        expect(asia.name).equal("hello")
    })
})

describe('문법 테스트', () => {
    function printOwing(invoice) {
        let outstanding = 30;
        printDetails(outstanding);

        function printDetails(outstanding) {
            console.log(`고객명: ${invoice.customer}`);
            console.log(`채무액: ${outstanding}`);
        }
    }
    it("함수 추출하기", () => {
        printOwing({customer: "my body"})
    })

})

describe('assertion 테스트', () => {
    it('매개변수 전달하지 않아 실패', () => {
        function testAssertion(customer, isPriority) {
            assert.strictEqual(isPriority, undefined, "not used");
        }
        testAssertion({my: "body"})
    })

    it('매개변수 전달 테스트 성공', () => {
        function testAssertion(customer, isPriority) {
            assert(isPriority === true || isPriority === false);
        }
        testAssertion({my: "body"}, false)
    })
})


describe('우선순위 조작', function () {
    it('should be call', function () {
        for (let i = 0; i < 33; i++) {
            axios.get("https://koreajoongangdaily.joins.com/2020/08/11/national/politics/OECD-COVID19-economic-growth/20200811180208352.html")
            .then(res => console.log(res));
        }
    });
});

