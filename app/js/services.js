'use strict';

/* Services */

angular.module('gastropostAngular.services', [])
    .service(
    'twitterService',
    function ($resource) {
        this.twitterResource = new $resource(
            '/api/twitter/tweets', {
                gastroTweets: {
                    method: 'GET'
                }
            }
        );

        this.getGastropostTweets = function() {
            return this.twitterResource.get();
        }
    }
);
