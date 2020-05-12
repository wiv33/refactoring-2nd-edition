const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const _ = require("lodash");

describe("212p", () => {
    function enrichReading(original) {
        const result = _.cloneDeep(original);
        result.baseCharge = calculateBaseCharge(result);
        result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
        return result;
    }

    it('check reading unchanged', () => {
        const baseReading = {customer: "ivan", quantity: 15, month: 5, year: 2020}
        const oracle = _.cloneDeep(baseReading);

        enrichReading(baseReading);

        assert.deepEqual(baseReading, oracle);
    })
})
