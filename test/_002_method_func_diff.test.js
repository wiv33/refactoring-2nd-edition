function hi(callback, ee) {
  callback(ee)
  return callback
}

const hello = hi((dd) => console.log("hi " + dd), "ee")

describe('method function difference', function () {
  it('console view', () => {
    hello("tt")
    //  log: 'hi ee'
    //  log: 'hi tt'
  });
  it('should diff', function () {
    const h1 = new hi((ee) => console.log("chec " + ee), "111");
    //log: 'chec 111'
    h1("erer");
    //log: 'chec erer'
    const h2 = new hi((ee) => console.log("dfdf " + ee), "yyy");
    //log: 'dfdf yyy'
    h2("h2h2")
    //log: 'dfdf g2g2'

    // new hello("mmu"); // Error!
    // log: hello is not a constructor
    hello("555")
    // log: hi 555
  });
});