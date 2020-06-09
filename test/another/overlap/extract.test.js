/*
    > 해당 데이터와 리팩터링 하는 함수의 출력 값을 테스트한다.
        -> 이때 모든 row의 값을 비교한다.
 */

const assert = require("assert");
const expectData = require("./result");

const appendFunc = require("./existing_function");
const MakeList = require('./ps_makeList');

const axios = require('axios');

describe('함수 추출하기', function () {
  let actual

  describe('should be equal data', function () {
    it('should be result match', function (done) {
      const url = "http://localhost:8060/article/management.do?startCount=0&startDate=2020.05.08&endDate=2020.05.08&keyword=&sort=asc";
      axios.get(url, {
        headers: {
          Cookie: `JSESSIONID=22663C3868C35962DA4AFF56A4B6D9B2`
        },
        responseType: "json",
      })
      .then(res => {
        const expect = appendFunc(expectData);
        const appender = new MakeList();
        actual = appender.makeHtml(res.data, 'image-scroll-wrapper');

        assert.deepStrictEqual(actual, expect);

        done();

      })

    });

    it('should be', function () {
      assert.strictEqual()
    });
  });

});

