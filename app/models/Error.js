class Error {
    constructor(error) {
        this._timestamp = new Date().getTime();
        this._message = error;
    }
}

module.exports = Error;