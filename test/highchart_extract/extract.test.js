const common = require('../default.test');
const describe = common.describe;
const it = common.it;
const chaiExpect = common.chaiExpect;
const _ = require('lodash');

const korData = require('./korData.js');
const data = require('./jsonData.js');

function extractCodeName(feature) {
    return {
        'iso-a3': feature.properties['iso-a3'],
        'name': feature.properties.name
    }
}

describe('extract test', function () {
    it('should be extract iso-a3 and name in features', function () {
        const result = _.map(data.features, extractCodeName);
        chaiExpect(result.length).eq(data.features.length)
    });

    it('should be merging kor name and json data', function () {
        const korCode = korData.map(m => m.code);
        data.features = _.map(data.features, f => {
            const find = _.find(f.properties, o => korCode.includes(o));
            if (!find) {
                return
            }
            f.properties.name = korData[korCode.indexOf(find)].nameKor
            return f
        })

        console.log(JSON.stringify(data));
    });
});