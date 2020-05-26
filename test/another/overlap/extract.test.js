/*
    > 해당 데이터와 리팩터링 하는 함수의 출력 값을 테스트한다.
        -> 이때 모든 row의 값을 비교한다.
 */

const assert = require("assert");
const expectData = require("./result");
const appendFunc = require("./move_function");

describe('함수 추출하기', function () {
    let actual

    it('should be equal data', function () {
        assert.deepStrictEqual(appendFunc(expectData), actual);
    });

});

