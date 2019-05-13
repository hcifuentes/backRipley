var http = require('./../HTTPServer');
var cityDao = require('./../dao/CityDao');
var request = require('request');

var socket = require('./../WebScoketService');

http.app.get('/all', (req, res) => {
    console.log("Get All")
    cityDao.getAllCities(res);
})

http.app.get('/reload', (req, res) => {
    cityDao.updateInfo(socket, request);
    res.send({ result: 'generando' });
});

