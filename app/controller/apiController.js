var request = require('request');
var cityDao = require('./../dao/CityDao');
var url = "https://api.darksky.net/forecast/72d49451abb0c818399bfe187ac1fefc/";
var message = 'How unfortunate! The API Request Failed';
var errorDao = require('../dao/ErrorDao');
var Error = require('../models/Error');
var http = require('http');
var cors = require('cors')

var express = require('express');
var app = express();
// web socket
var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.set('origins', '*:*');

app.use(cors({
    origin: true,
    credentials: true
    }));

server.listen(3001, function () {
    console.log('Servidor corriendo en http://localhost:3001');
});

var socketIO;

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socketIO = socket;

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

var getCities = function () {
    var cities;
    return {
        obtain: function () {
            return new Promise((resolve, reject) => {
                var fun = cityDao.getAllCities();
                fun.findAllCities()
                    .then(() => {
                        cities = fun.get();
                        resolve();
                    })
            });
        },
        get: function () {
            return cities;
        }
    }
}

exports.updateInfo = function () {
    var fun = getCities();
    fun.obtain()
        .then(() => {
            var cities = fun.get();
            for (const code in cities) {
                var city = JSON.parse(cities[code]);
                getRequest(city);
            }
        })

}

function getRequest(city, vez = "primera") {
    request({
        url: url + city._latLng._lat + ',' + city._latLng._lng,
        json: true
    }, (error, response, body) => {
        try {
            if (Math.random(0, 1) < 0.1) {
                throw new Error(message);
            } else {
                data = (!error && response.statusCode === 200) ? response.data : null;
                parseData(city, body);
            }
        } catch (error) {
            if (message === error._message) {
                errorDao.save(error);
                getRequest(city, "de vuelta");
            }
        }
    });
}

function parseData(city, data) {
    if (city._temp != (data).currently.temperature || city._tz != data.timezone) {
        city._temp = (data).currently.temperature;
        city._tz = data.offset;
        cityDao.saveCity(city);
        socketIO.emit('pop', city);
        socketIO.broadcast.emit('city', { hello: 'world' });
    }
}