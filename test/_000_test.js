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
    printOwing({customer: "my body"})

})