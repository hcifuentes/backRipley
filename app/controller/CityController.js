var http = require('./../HTTPServer');
var cityDao = require('./../dao/CityDao');
var request = require('request');

var io = require('./../WebScoketService').io;

http.app.get('/all', (req, res) => {
    cityDao.getAllCities(res);
})

http.app.get('/reload', (req, res) => {
    cityDao.updateInfo(io, request);
    res.send({ result: 'generando' });
});

