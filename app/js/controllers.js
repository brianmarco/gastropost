'use strict';

/* Controllers */

angular.module('gastropostAngular.controllers', [])

.controller('WallController', ['$scope', '$resource', '$http', function(scope, resource, http) {
  scope.brand = 'Gastropost Wall';

  scope.tweets = null;

  scope.instagrams={};

  scope.twitter = function() {
    http({
      method: 'GET',
      url: '/api/twitter/tweets',
    })
    .success(function(data, status) {
      scope.tweets = data;

      for (var i=0; i<scope.tweets.statuses.length; i++) {
        var status = scope.tweets.statuses[i];

        if (status.entities && status.entities.urls) {
          var urls = status.entities.urls;

          var INSTAGRAM_URL_PATTERN = /instagram\.com/;

          for (var j=0; j<urls.length; j++) {
            var url = urls[j];

            if (url.expanded_url.match(INSTAGRAM_URL_PATTERN)) {
              scope.instagrams[status.id] = url.expanded_url + 'media';
              break;
            }
          }
        }
      }
    })
    .error(function(data, status) {
      console.log('FAIL');
      console.dir(data);
    });
  }

  scope.twitter();
}])

.controller('DetailsController', ['$scope', function(scope) {
}]);
