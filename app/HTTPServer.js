var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors({
    origin: true,
    credentials: true
}));

app.listen(3000, function () {
    console.log('Servidor HTTP en puerto 3000');
});

exports.app = app;