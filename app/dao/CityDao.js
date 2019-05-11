
var redisClient = require('../db/redis');
var City = require('../models/City');

var category = 'city';

var cl = new City('CL', 'Santiago', -33.4533303, -70.6967031);
var ch = new City('CH', 'Zurich', 47.3775499, 8.4666755);
var nz = new City('NZ', 'Auckland', -36.8626662, 174.725387);
var au = new City('AU', 'Sydney', -33.8766581, 150.9015058);
var uk = new City('UK', 'Londres', 51.5287718, -0.2416804);
var usa = new City('USA', 'Georgia', 42.3173563, 42.2366201);

var cityArray = [cl, ch, nz, au, uk, usa];

for (const city of cityArray) {
    redisClient.hmset(category, { [city._code]: JSON.stringify(city) }, (err, reply) => {
        if (err) {
            console.log(err)
        } else {
            console.log("save");
        }
    });
}


exports.getAllKeys = function () {
    var keys;
    return {
        findAllKeys: function () {
            return new Promise((resolve, reject) => {
                redisHashesClient.keys('*', (error, result) => {
                    if (error) {
                        throw error;
                    }
                    console.log(result);
                    keys = result;
                    resolve();
                });
            });
        },
        get: function () {
            return keys;
        }
    }
}

exports.getByKey = function () {
    var city = null;

    return {
        findCity: function (key) {
            return new Promise((resolve, reject) => {
                redisClient.hmget(category, key, (err, object) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(object);
                        city = object;
                        resolve(object);
                    }
                });
            });
        },
        get: function () {
            return city;
        }
    }
}
