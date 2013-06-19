//
// Express setup
//

var express = require('express');

// Setup Twitter client.
var twitterClient = require('../twitter-client');

// Setup Redis client.
var redisClient = require('../redis-client');

var webroot = __dirname + '/../../../app';

// Setup Express
var app = express();

app.use(express.static(webroot));

app.get('/api/twitter/tweets', function (req, res) {
    var getFreshTweets = req.query.fresh || false;

    var tweetsAge = redisClient.redis.get('tweetsAge');

    if (getFreshTweets || tweetsAge && tweetsAge > ((new Date()).getTime() - 180000)) {
        console.log('Getting fresh tweets.');

        twitterClient.findTweets(function (data, response) {
            redisClient.redis.set('tweets', JSON.stringify(data));
            redisClient.redis.set('tweetsAge', (new Date()).getTime());

            res.send(data);
        });
    }
    else {
        console.log('Getting tweets from cache.');

        redisClient.redis.get('tweets', function (err, value) {
            res.send(value);
        });
    }
});

exports.webroot = webroot;
exports.app = app;
