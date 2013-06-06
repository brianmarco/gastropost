'use strict';

/* Controllers */

angular.module('gastropostAngular.controllers', [])

.controller('WallController', ['$scope', '$resource', '$http', function(scope, resource, http) {
    scope.welcome = 'Gastropost';

    scope.tweets = null;

    scope.twitter = function() {
        http({
            method: 'GET',
            url: '/hello.txt',
        })
        .success(function(data, status) {
            console.log('SUCCESS');
            console.dir(data);
            scope.tweets = data;
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
