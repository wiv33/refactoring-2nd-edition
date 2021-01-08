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

    class CalcRange {
        constructor(divide, numA, numB) {
            this._divide = divide
            this._numA = numA
            this._numB = numB
        }
        get numA() {
            return this._numA
        }
        get numB() {
            return this._numB
        }
        get divide() {
            return this._divide
        }

        absMax() {
            return Math.max(Math.abs(this.numA), Math.abs(this.numB));
        }

        absMin() {
            return Math.min(Math.abs(this.numA), Math.abs(this.numB));
        }

        absSum() {
            if (this.numA < 0 && this.numB < 0) {
                return this.absMax() - this.absMin();
            }
            return Math.abs(this.numA) + Math.abs(this.numB);
        }

        response() {
            let result = []
            const step = Math.round(this.absSum() / this.divide) //  4
            let _from = Math.max(this.numB, this.numA)
            let _to = Math.min(this.numA, this.numB)
            for (let i = 0; i < this.divide; i++) {
                _from = _from - step
                _to = _from + step
                result.push({min: _from, max: _to})
            }
            return _.sortBy(result, 'max');
        }
    }
    it('-부터 +까지 정상적인 연산 테스트', function () {
        const expected = [{min: -2, max: 1}, {min: 1, max: 4}, {min: 4, max: 7}, {min: 7, max: 10}]
        const calculation = new CalcRange(divide, min, max);

        chaiAssert.strictEqual(calculation.numB, 10)
        chaiAssert.strictEqual(calculation.numA, -2)
        chaiAssert.strictEqual(calculation.divide, 4)

        chaiAssert.deepEqual(expected, calculation.response())
    });

    it('양수의 연산', function () {
        const expected = [{min: 0, max: 250}, {min: 250, max: 500}, {min: 500, max: 750}, {min: 750, max: 1000}]
        const calculation = new CalcRange(4, 0, 1000);
        chaiAssert.deepEqual(expected, calculation.response())
    });

    it('test change the min and max', function () {
        const expected = [ { min: -300, max: 25 }, { min: 25, max: 350 }, { min: 350, max: 675 }, { min: 675, max: 1000 } ]
        const cal = new CalcRange(4, 1000, -300);
        chaiAssert.deepEqual(cal.response(), expected)
    });

    it('음수끼리의 range', function () {
        const expected = [ { min: -2000, max: -1750 },
            { min: -1750, max: -1500 },
            { min: -1500, max: -1250 },
            { min: -1250, max: -1000 } ]
        const cal = new CalcRange(4, -2000, -1000);
        chaiAssert.deepEqual(expected, cal.response())
    });
});