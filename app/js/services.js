'use strict';

/* Services */

angular.module('gastropostAngular.services', [])

    // Service getting at the tweets. Uses a server side REST client to get around cross domain issues.  Not quite a
    // Server Proxy but pretty darn close. :)  Returns the raw response from Twitter Search API (as a promise).
    .service('twitterService', function ($resource) {
        var twitterResource = new $resource('/api/twitter/tweets');

        var getGastropostTweets = function (getFreshTweets) {
            if (getFreshTweets) {
                return twitterResource.get({fresh: true});
            }

            return twitterResource.get();
        }

        return {
            getGastropostTweets: getGastropostTweets
        }
    })

    // Fetch possible images for an array of tweets (i.e. statuses)
    .service('tweetsImageService', function () {
        var getImagesForTweets = function (tweets) {
            var tweetImages = {};

            for (var i = 0; i < tweets.length; i++) {
                var status = tweets[i];

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
                                tweetImages[status.id] = url.expanded_url + 'media';
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

                            tweetImages[status.id] = mediaElem.media_url + ':' + mediaSize;
                        }
                    }
                }
            }

            return tweetImages;
        }

        return {
            getImagesForTweets: getImagesForTweets
        }
    });
