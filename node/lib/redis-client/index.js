//
// Client for Redis
//

var redis = require('redis-url');

// Connect to Redis for server side caching of Twitter API results
console.log('About to connect to Redis using: ' + process.env.REDISTOGO_URL);
redis = redis.connect(process.env.REDISTOGO_URL);

exports.redis = redis;
