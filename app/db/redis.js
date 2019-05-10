var redis = require('redis');
var redisClient = redis.createClient();


redisClient.on('connect', function () {
    console.log('Conexion a Redis establecida');
});

redisClient.on('error', function (err) {
    console.log('Error al conectarse a Redis ' + err);
});

redisClient.flushdb( function (err, succeeded) {
    console.log('Redis ha sido limpiado y esta listo para usarse'); 
});

module.exports = redisClient;