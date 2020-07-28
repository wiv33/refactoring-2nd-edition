module.exports = {
  assert: require("assert"),

  // tag::mocha[]
  mocha: require("mocha"),
  describe: require("mocha").describe,
  it: require("mocha").it,
  // end::mocha[]


  // tag::chai[]
  /*
    how to use
    https://www.chaijs.com/guide/styles/
   */
  chai: require("chai"),
  chaiAssert: require("chai").assert,
  chaiExpect: require("chai").expect
  // end::chai[]
};
