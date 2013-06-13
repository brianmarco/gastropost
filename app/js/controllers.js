'use strict';

/* Controllers */

angular.module('gastropostAngular.controllers', [])
    .controller('WallController', ['$scope', 'twitterService', function (scope, twitterService) {
        scope.brand = 'Gastropost Wall';

        scope.tweets = null;

        scope.tweetImages = {};

        twitterService.getGastropostTweets().$then(function (response) {
            var statuses = response.data.statuses;

            scope.tweets = statuses;

            for (var i = 0; i < statuses.length; i++) {
                var status = statuses[i];

                if (status.entities) {
                    if (status.entities.urls) {
                        var urls = status.entities.urls;

                        var INSTAGRAM_URL_PATTERN = /instagram\.com/;

                        // Check for any instagram pictures.
                        // Just use the first one if found.
                        for (var j = 0; j < urls.length; j++) {
                            var url = urls[j];

                            if (url.expanded_url.match(INSTAGRAM_URL_PATTERN)) {

                                // Appending "media" to the end of the URL to get direct access to the image.
                                scope.tweetImages[status.id] = url.expanded_url + 'media';
                                break;
                            }
                        }
                    }

                    if (status.entities.media) {
                        var media = status.entities.media;

                        if (media.length > 0) {

                            // Just grab the first image.
                            var mediaElem = media[0];

                            // Use the small version of the image.  If not available use the thumb size.
                            // See https://dev.twitter.com/docs/tweet-entities for more info.
                            var mediaSize = (mediaElem.sizes.small ? 'small' : 'thumb');

                            scope.tweetImages[status.id] = mediaElem.media_url + ':' + mediaSize;
                        }
                    }
                }
            }
        });
    }])

    .controller('DetailsController', ['$scope', function (scope) {
    }]);
