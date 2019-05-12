var redisClient = require('../db/redis');
var error = require('../models/Error');

var category = 'api.errors';

exports.save = function (error) {
    redisClient.hmset(category, { [error._timestamp]: JSON.stringify(error) }, (err, reply) => {
    });
}