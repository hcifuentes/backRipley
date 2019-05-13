
var redisClient = require('../db/redis');
var City = require('../models/City');
var url = "https://api.darksky.net/forecast/0867c516c1e2991274cdecf845c3392e/";
var message = 'How unfortunate! The API Request Failed';
var errorDao = require('../dao/ErrorDao');
var Error = require('../models/Error');


var category = 'city';

var cl = new City('CL', 'Santiago', -33.4533303, -70.6967031);
var ch = new City('CH', 'Zurich', 47.3775499, 8.4666755);
var nz = new City('NZ', 'Auckland', -36.8626662, 174.725387);
var au = new City('AU', 'Sydney', -33.8766581, 150.9015058);
var uk = new City('UK', 'Londres', 51.5287718, -0.2416804);
var usa = new City('USA', 'Georgia', 32.658071,-85.426872);

var cityArray = [cl, ch, nz, au, uk, usa];


for (const city of cityArray) {
    save(city);
}

function save(city) {
    redisClient.hmset(category, { [city._code]: JSON.stringify(city) }, (err, reply) => {
    });
}

exports.saveCity = function (city) {
    save(city);
}

exports.getAllCities = function (res) {
    return getAllFromRedis(res);
}

exports.updateInfo = function (socket, request) {
    redisClient.hgetall(category, (err, cities) => {
        for(const city in cities) {
            getRequest(JSON.parse(cities[city]), socket, request);
        }
    })
}

function getRequest(city, socket, request) {
    var api = url + city._latLng._lat + ',' + city._latLng._lng; 
    console.log(api);
    request({
        url: api,
        json: true
    }, (error, response, body) => {
        try {
            if (Math.random(0, 1) < 0.1) {
                throw new Error(message);
            } else {
                data = (!error && response.statusCode === 200) ? response.body : null;
                parseData(city, data, socket);
            }
        } catch (error) {
            if (message === error._message) {
                errorDao.save(error);
                getRequest(city, socket, request);
            }
        }
    });
}

function parseData(city, data, io) {
    if (city._temp != (data).currently.temperature || city._tz != data.timezone) {
        city._temp = (data).currently.temperature;
        city._tz = data.offset;
        save(city);
        io.sockets.emit('pop', city);
    }
}

function getAllFromRedis(res) {
    redisClient.hgetall(category, (err, cities) => {
        if (err) {
            console.log('error', err)
        } else {
            console.log("pasando")
            if (res) {
                console.log("con res")
                res.send({ data: cities });
            } else {
                console.log('sin res')
                return cities;
            }
        }
    });
}