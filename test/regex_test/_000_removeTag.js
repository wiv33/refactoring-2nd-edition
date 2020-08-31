module.exports = function (text) {
  return text.replace("\<br\>", "")
      .replace(/[“”]|\u201c|\u201d/gi, '"')
      .replace(/[‘’]|\u2018|\u2019/gi, "'")

};