const common = require("./default.test");
const assert = common.assert;
const mocha = common.mocha;
const beforeEach = mocha.beforeEach;

describe('객체 확인', function () {
  class TestObj {
    constructor(data) {
      this._name = data.name;
    }

    get name() {
      return this._name;
    }
  }

  beforeEach(() => {

  });


  it('should be equals new class name and name', function () {
    assert.strictEqual(new TestObj({name: "ps"}).name, "ps");
    assert.strictEqual(new TestObj({name: "awesome"}).name, "awesome");
  });

  it('should be equals new Object id and id', function () {
    const obj1 = {id: "ps"};
    assert.strictEqual(obj1.id, "ps")
    assert.deepStrictEqual(obj1.id, "ps")

    const obj2 = {id: "awesome"};
    assert.strictEqual(obj2.id, "awesome")
    assert.deepStrictEqual(obj2.id, "awesome")

    assert.notStrictEqual(obj1, obj2);
  });

  function Generate() {
    return new Object({id: "ps", name: "awesome", init: () => {
        this.id = "ps";
        this.name = "awesome";
      }});
  }

  it('should be not equals properties in new Objects', () => {
    const obj = new Generate();
    assert.strictEqual(obj.id, "ps");
    assert.deepStrictEqual(obj.name, "awesome");

    const obj2 = new Generate();
    assert.strictEqual(obj2.id, "ps");
    assert.deepStrictEqual(obj2.name, "awesome");
  });

  it('should be ', function () {
    const obj = new Generate();

    obj.id = "psk";
    obj.name = "bird";

    // init 재정의
    obj.init = function() {this.id = "news";}

    assert.deepStrictEqual(obj.id, "psk");
    assert.deepStrictEqual(obj.name, "bird");
    obj.init();
    assert.notStrictEqual(obj.id, "ps")
    assert.strictEqual(obj.id, "news");


    const obj2 = new Generate();

    assert.strictEqual(obj2.id, "ps");
    assert.deepStrictEqual(obj2.name, "awesome");

  });
});