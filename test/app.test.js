const Province = class Province {
    constructor(doc) {
        this._name = doc.name;
    }
    get name() {return this._name}
}
module.exports = Province