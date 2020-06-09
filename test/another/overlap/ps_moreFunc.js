const _ = require("lodash");
module.exports = function (initParam) {
  this.pageId = initParam.pageId
  this.totalHeight = initParam.totalHeight
  this.listSelector = initParam.listSelector

  this.isNotUpdateSearchKeywords = true;
  this.searchFlag = false
  this.isMore = false

  this.initArticleList = function () {
    this.pageId = this.totalHeight = 0;
    this.searchFlag = this.isMore = false;

    // $(this.listSelector).empty();
    const listParent = document.getElementById(this.listSelector);
    while (listParent.firstChild) {
      listParent.removeChild(listParent.firstChild);
    }
  };

  this.appendArticleList = function (param) {
    this.isMore = param.isMore;

    let slim = param.slim,
      searchParams = param.searchParams;


    _.debounce(function () {

    }, 170)
  };


}

