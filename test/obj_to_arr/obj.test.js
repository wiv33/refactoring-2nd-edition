const common = require('../default.test');
const data = require("./_obj");
const describe = common.describe;
const it = common.it;
const chaiAssert = common.chaiAssert;
const chaiExpect = common.chaiExpect;


describe('test loop name in obj', function () {
  it('should be equal ', function () {
    const reduce = Object.getOwnPropertyNames(data)
                         .filter(f => data[f])
                         .reduce((acc, el) => {
                           acc.push(el)
                           return acc
                         }, []);

    chaiAssert.isTrue(Object.getOwnPropertyNames(data).includes('tutorial'))

    chaiAssert.deepEqual(reduce, ['name', 'machine', 'thread', 'akka', 'phone', 'number', 'address'])
    chaiAssert.isFalse(reduce.includes('tutorial'))
  });
});

