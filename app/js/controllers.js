'use strict';

/* Controllers */

angular.module('gastropostAngular.controllers', [])
    .controller('WallController', [
        '$scope',
        '$routeParams',
        'twitterService',
        'tweetsCacheService',
        'tweetsImageService',

        function (scope, routeParams, twitterService, tweetsCacheService, tweetsImageService) {
            scope.tweetsCache = tweetsCacheService;
            scope.tweets = null;
            scope.tweetImages = null;

            if (routeParams.fresh ||
                !scope.tweetsCache.getTweetsAge() ||
                scope.tweetsCache.getTweetsAge() < ((new Date()).getTime() - 1800000)) {
                twitterService.getGastropostTweets().$then(function (response) {
                    scope.tweets = response.data.statuses;
                    scope.tweetsCache.putTweets(scope.tweets);
                    scope.tweetImages = tweetsImageService.getImagesForTweets(scope.tweets);
                });
            }
            else {
                scope.tweets = scope.tweetsCache.getTweets();
                scope.tweetImages = tweetsImageService.getImagesForTweets(scope.tweets);
            }
        }]);
