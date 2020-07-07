const common = require("./default.test");
const assert = common.assert;
const mocha = common.mocha;
const beforeEach = mocha.beforeEach;
const afterEach = mocha.afterEach;

function Generate() {
  return {
    id: "ps", name: "awesome", init: function () {
      this.id = "ps";
      this.name = "awesome";
    }
  };
}

describe('class와 object({})의 차이와 {}의 새로운 객체 테스트', function () {

  describe('class equal', function () {
    class TestObj {
      constructor(data) {
        this._name = data.name;
      }

      get name() {
        return this._name;
      }
    }

    it('should be equals new class name and name', function () {
      assert.strictEqual(new TestObj({name: "ps"}).name, "ps");
      assert.strictEqual(new TestObj({name: "awesome"}).name, "awesome");
    });

  });

  describe('new Object', function () {
    it('should be equals new Object id and id', function () {
      const obj1 = {id: "ps"};
      assert.strictEqual(obj1.id, "ps")
      assert.deepStrictEqual(obj1.id, "ps")

      const obj2 = {id: "awesome"};
      assert.strictEqual(obj2.id, "awesome")
      assert.deepStrictEqual(obj2.id, "awesome")

      assert.notStrictEqual(obj1, obj2);
    });

    let obj, obj_2;

    beforeEach(() => {
      obj = new Generate();
      obj_2 = new Generate();
    })

    afterEach(() => {
      obj = obj_2 = undefined;
    })

    it('should be not equals properties in new Objects', () => {
      obj = new Generate();
      assert.strictEqual(obj.id, "ps");
      assert.deepStrictEqual(obj.name, "awesome");

      obj_2 = new Generate();
      assert.strictEqual(obj_2.id, "ps");
      assert.deepStrictEqual(obj_2.name, "awesome");
    });

    it('should be obj have nothing to do with obj_2', function () {
      obj = new Generate();
      obj_2 = new Generate();

      obj.id = "psk";

      obj.name = "bird";
      assert.deepStrictEqual(obj.id, "psk");

      assert.deepStrictEqual(obj.name, "bird");

      assert.strictEqual(obj_2.id, "ps");
      assert.deepStrictEqual(obj_2.name, "awesome");

      obj_2.id = "nullPoint";
      obj_2.name = "exception";
      assert.deepStrictEqual(obj_2.id, "nullPoint");
      assert.deepStrictEqual(obj_2.name, "exception");

    });

    it('should be obj.init() have nothing to do with obj_2', function () {
      obj_2.id = "relu";
      obj_2.name = "keras"

      // init 재정의
      obj.init = function () {
        this.id = "news";
      }

      obj.init();
      assert.notStrictEqual(obj.id, "psk")
      assert.strictEqual(obj.id, "news");

      assert.deepStrictEqual(obj_2.id, "relu");
      assert.deepStrictEqual(obj_2.name, "keras");

    });

    it('should be obj.init() override have nothing to do with obj_2.init()', function () {

      obj_2.id = "tensorflow";
      obj_2.name = "keras"

      assert.deepStrictEqual(obj_2.id, "tensorflow");
      assert.deepStrictEqual(obj_2.name, "keras");

      // init 재정의
      obj.init = function () {
        this.id = "news";
      }

      obj.init();
      assert.notStrictEqual(obj.id, "ps") // default is ps
      assert.strictEqual(obj.id, "news"); // after init() news

      obj_2.init();
      assert.deepStrictEqual(obj.id, "news"); // after obj.init() is "news"
      assert.deepStrictEqual(obj.name, "awesome"); // not update value is "awesome"

      assert.deepStrictEqual(obj_2.id, "ps"); // after obj2.init() is "ps" which default value
      assert.deepStrictEqual(obj_2.name, "awesome");  // after obj2.init() is "awesome" which default value

    });

    it('should obj unused new keyword have nothing to do with obj2', function () {
      obj = Generate();
      obj_2 = Generate();

      obj.id = "bird"
      obj.name = "new word";

      assert.notStrictEqual(obj_2.id, "bird");
      assert.notStrictEqual(obj_2.name, "new word");

      assert.strictEqual(obj.id, "bird");
      assert.strictEqual(obj.name, "new word");

    });
  });


});