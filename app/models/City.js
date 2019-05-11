const LatLng = require('./LatLng');

class City {

    constructor(code, name, lat, lng ) {
        this._code = code;
        this._name = name;
        this.latLng = new LatLng(lat, lng);
    }

    /**
     * @param {string} name
     */
    set name(name) {
        this._name = name;
    }

    /**
     * @param {LatLng} latLng
     */
    set latLng(latLng) {
        this._latLng = latLng;
    }

    /**
     * @param {string} code
     */
    set code(code) {
        this._code = code;
    }

    get name() {
        return this._name;
    }

    get code() {
        return this._code;
    }

}
module.exports = City;