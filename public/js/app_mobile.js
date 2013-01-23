'use strict';


// Declare app level module which depends on filters, and services
angular.module('activity', ['activity.filters', 'activity.services', 'activity.directives', 'ui.directives', 'ui.filters']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
    		templateUrl: 'partials/mobile'
    	}).otherwise({
    		redirectTo: '/'
    	});
    $locationProvider.html5Mode(true);
  }]);