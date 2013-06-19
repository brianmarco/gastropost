'use strict';

/* Controllers */

angular.module('gastropostAngular.controllers', [])
    .controller('WallController', [
        '$scope',
        '$routeParams',
        'twitterService',
        'tweetsImageService',

        function (scope, routeParams, twitterService, tweetsImageService) {
            scope.tweets = null;
            scope.tweetImages = null;

            twitterService.getGastropostTweets(routeParams.fresh).$then(function (response) {
                scope.tweets = response.data.statuses;
                scope.tweetImages = tweetsImageService.getImagesForTweets(scope.tweets);
            });
        }]);
