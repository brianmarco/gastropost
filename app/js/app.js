'use strict';


// Declare app level module which depends on filters, and services
angular.module(
    'gastropostAngular',
    ['gastropostAngular.filters',
    'gastropostAngular.services',
    'gastropostAngular.directives',
    'gastropostAngular.controllers',
    'ngResource']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/wall', {templateUrl: 'partials/wall.html', controller: 'WallController'});
    $routeProvider.when('/details', {templateUrl: 'partials/details.html', controller: 'DetailsController'});
    $routeProvider.otherwise({redirectTo: '/wall'});
  }]);
