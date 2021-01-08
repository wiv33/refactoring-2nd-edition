const common = require('../default.test');

const describe = common.describe;
const chaiExpect = common.chaiExpect;
const it = common.it;
const chaiAssert = common.chaiAssert;
const _ = require('lodash')

describe('divide negative', function () {
    const divide = 4
    const max = 10
    const min = -2
    const expected = [{min: -2, max: 1}, {min: 1, max: 4}, {min: 4, max: 7}, {min: 7, max: 10}]

    class Calculation {
        constructor(divide, min, max) {
            this._divide = divide
            this._min = min
            this._max = max
        }
        get min() {
            return this._min
        }
        get max() {
            return this._max
        }
        get divide() {
            return this._divide
        }
        calc() {
            let result = []
            const absSum = Math.abs(this.min) + Math.abs(this.max);
            const step = Math.ceil(absSum / this.divide) //  4
            let _from = this.max
            let _to = this.min
            for (let i = 0; i < this.divide; i++) {
                _from = _from - step
                _to = _from + step
                result.push({min: _from, max: _to})
            }
            return _.sortBy(result, 'max');
        }
    }
    it('-부터 +까지 정상적인 연산 테스트', function () {
        chaiAssert.isArray(expected)
        const calculation = new Calculation(divide, min, max);

        chaiAssert.strictEqual(calculation.max, 10)
        chaiAssert.strictEqual(calculation.min, -2)
        chaiAssert.strictEqual(calculation.divide, 4)

        chaiAssert.deepEqual(expected, calculation.calc())
    });

    it('should ', function () {
        
    });

});