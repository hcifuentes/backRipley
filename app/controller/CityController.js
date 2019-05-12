var express = require('express');
var app = express();
// web socket
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors')
var cityDao = require('../dao/CityDao');
var apiController = require('../controller/apiController');

app.use(cors({
    origin: true,
    credentials: true
    }));

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
    apiController.updateInfo();
    res.send({result: 'generando'});
});


app.get('/api', (req, res) => {
    res.send({ data: 'api' });
});


