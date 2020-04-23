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

