const common = require('../default.test');
const describe = common.describe;
const it = common.it;
const chaiExpect = common.chaiExpect;
const _ = require('lodash');

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
});