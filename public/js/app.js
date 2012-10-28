'use strict';


// Declare app level module which depends on filters, and services
angular.module('activity', ['activity.filters', 'activity.services', 'activity.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/list', {
    		templateUrl: 'partials/list'
      }).when('/small', {
    		templateUrl: 'partials/small'
      }).when('/medium', {
    		templateUrl: 'partials/medium'
    	}).when('/large', {
    		templateUrl: 'partials/large'
    	}).when('/map', {
    		templateUrl: 'partials/map'
    	}).otherwise({
    		redirectTo: '/medium'
    	});
    $locationProvider.html5Mode(true);
  }]);