'use strict';

/* Controllers */

angular.module('gastropostAngular.controllers', [])

    .controller('WallController', ['$scope', 'twitterService', function (scope, twitterService) {
        scope.brand = 'Gastropost Wall';

        scope.tweets = null;
        scope.tweetGroups = null;

        scope.instagrams = {};

        twitterService.getGastropostTweets().$then(function (response) {
            var statuses = response.data.statuses;

            scope.tweetGroups = statuses.chunk(3);

            for (var i = 0; i < statuses.length; i++) {
                var status = statuses[i];

                if (status.entities && status.entities.urls) {
                    var urls = status.entities.urls;

                    var INSTAGRAM_URL_PATTERN = /instagram\.com/;

                    for (var j = 0; j < urls.length; j++) {
                        var url = urls[j];

                        if (url.expanded_url.match(INSTAGRAM_URL_PATTERN)) {
                            scope.instagrams[status.id] = url.expanded_url + 'media';
                            break;
                        }
                    }
                }
            }
        });
    }])

    .controller('DetailsController', ['$scope', function (scope) {
    }]);
