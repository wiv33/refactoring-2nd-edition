const common = require("../default.test");
const chai = common.chai;
const chaiAssert = common.chaiAssert;
const data = require("./kakao_maps_data").data;
const _ = require("lodash")

describe('data transfer', function () {
  const expected = [{title: '대학동029', latlng: '126.9419957,37.4698767'}, {
    title: '대학동030',
    latlng: '126.9421541,37.4698691'
  }]

  it('should be equal transform data and expected data', function () {
    const actual = data.map(d => {
      let obj = {}
      obj['title'] = d['보안등위치명']
      obj['latlng'] = [d['경도'], d['위도']].join()
      return obj
    }).reduce((acc, el) => {
      acc.push(el)
      return acc
    }, []);
    chaiAssert.deepEqual(actual, expected, "deepEqual actual and expected")

    let actualArr = []
    data.forEach(d => {
      let obj = {}
      obj['title'] = d['보안등위치명']
      obj['latlng'] = [d['경도'], d['위도']].join()
      actualArr.push(obj)
    })

    chaiAssert.deepEqual(actualArr, expected, "deepEqual actual and expected")

  });

});