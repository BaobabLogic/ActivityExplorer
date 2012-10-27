'use strict';


// Declare app level module which depends on filters, and services
angular.module('activity', ['activity.filters', 'activity.services', 'activity.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/list', {
    		templateUrl: 'partials/list', 
    		controller: ResultsCtrl
      }).when('/small', {
    		templateUrl: 'partials/small', 
    		controller: ResultsCtrl
      }).when('/medium', {
    		templateUrl: 'partials/medium', 
    		controller: ResultsCtrl
    	}).when('/large', {
    		templateUrl: 'partials/large', 
    		controller: ResultsCtrl
    	}).when('/map', {
    		templateUrl: 'partials/map', 
    		controller: ResultsCtrl
    	}).otherwise({
    		redirectTo: '/medium'
    	});
    $locationProvider.html5Mode(true);
  }]);