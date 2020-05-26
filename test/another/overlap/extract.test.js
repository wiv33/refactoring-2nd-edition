/*
    > 해당 데이터와 리팩터링 하는 함수의 출력 값을 테스트한다.
        -> 이때 모든 row의 값을 비교한다.
 */

const old = require("./result");
const assert = require("assert");

describe('함수 추출하기', function () {
    let newData;

    it('should be equal data', function () {
        for (let resDataKey in old) {
            assert.strictEqual(old[resDataKey], newData[resDataKey]);
        }
        assert.deepStrictEqual(old["RESULT_LIST"], newData["RESULT_LIST"]);
    });

});

