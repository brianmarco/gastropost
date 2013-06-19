// 
// Client for Twitter API
//

// Extra configuration file needed to store Twitter API tokens.
// Not included in git repo.
var TWITTER_API_CONFIG_FILE = './twitter-api.conf.js';
var TWITTER_API_CONFIG = require(TWITTER_API_CONFIG_FILE);
var BEARER_TOKEN = TWITTER_API_CONFIG.bearerToken;
if (!BEARER_TOKEN) {
    console.error('Unable to obtain Twitter Bearer Token from Twiter API configuration at: '
        + TWITTER_API_CONFIG_FILE
        + '\nEnsure Bearer Token setting is resolvable.'
        + '.\nBearer Token setting key: '
        + 'TWITTER_API_CONFIG.bearerToken');

    process.exit(1);
}

// Setup the REST client for accessing the Twitter API.
// This will use Application-only authentication (https://dev.twitter.com/docs/auth/application-only-auth).
var Client = require('node-rest-client').Client;
var client = new Client();
client.registerMethod('findTweets', 'https://api.twitter.com/1.1/search/tweets.json', 'GET');

exports.findTweets = function (callback) {
    var args = {
        parameters: {
            q: '%23gastropost%20-RT'
        },
        headers: {
            Authorization: 'Bearer ' + BEARER_TOKEN
        }
    };

    client.methods.findTweets(args, callback);
}
