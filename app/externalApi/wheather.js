var request = require("request");
var url = "https://api.darksky.net/forecast/72d49451abb0c818399bfe187ac1fefc/37.8267,-122.4233";


exports.getData = function () {
    var data;
    return {
        obtain: function () {
            return new Promise((resolve, reject) => {
                request({
                    url: url,
                    json: true
                }, (error, response, body) => {
                    if ( Math.random(0, 1) < 0.1) {
                        reject()
                    } else {
                        data = !error && response.statusCode === 200 ? resposne : null;
                        resolve();
                    }
                });
            });
        },
        get: function () {
            return data;
        }
    }
}