var app = require('./HTTPServer');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var socketIO;

io.set('origins', '*:*');

server.listen(3001, function () {
    console.log('Servidor WEBSOCKET en 3001');
});

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado");
    });
});

exports.io = io;



