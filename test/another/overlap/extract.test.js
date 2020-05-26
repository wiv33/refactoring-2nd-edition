/*
    > 해당 데이터와 리팩터링 하는 함수의 출력 값을 테스트한다.
        -> 이때 모든 row의 값을 비교한다.
 */

const assert = require("assert");
const expectData = require("./result");
const appendFunc = require("./existing_function");


describe('함수 추출하기', function () {
  let actual

  describe('should be equal data', function () {
    it('should be result match', function () {
        const expect = appendFunc(expectData);
        actual =
        assert.deepStrictEqual(actual, expect);
    });

      it('should be', function () {
          assert.strictEqual()
      });
  });

});

