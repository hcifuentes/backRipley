var express = require('express');
var cityDao = require('../dao/CityDao');
var weather = require('../externalApi/wheather');

var app = express();

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/', (req, res) => {
    var fun = cityDao.getByKey();
    fun.findCity('CL')
    .then(()=> {
        res.send({ data: JSON.parse(fun.get())  });
    });
});

app.get('/reload', (req, res) => {
    var fun = weather.getData()
    fun.obtain()
    .then(() => {
        res.send({ data: fun.get() });
    })
    .catch(()=> {
        throw new Error('How unfortunate! The API Request Failed')
    })
});

app.get('/api', (req, res) => {
    res.send({ data: 'api' });
});


