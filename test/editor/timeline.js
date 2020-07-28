const InitTestObj = {
  name: "",
  body: "",
  init({name: name, body: body}) {
    this.name = name;
    this.body = body
    return this;
  }
}

module.exports = InitTestObj;

