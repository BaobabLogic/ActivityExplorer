'use strict';

/* Directives */
var app=angular.module('activity.directives', []);

app.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

app.directive('ngVisible', function() {
  return function(scope, element, attr) {
    scope.$watch(attr.ngVisible, function(visible) {
      element.css('display', visible ? 'block' : 'none');
    });
  };
});

app.directive('searchBar', function() {
    return function(scope, elm, attrs) {
        var events = scope.$eval(attrs.searchBar);
        angular.forEach(events, function(value, key) {
            elm.bind(key, function() {
            		if (scope.search == scope.blur) {
                	scope.$apply(value);
            		}
            		else if (scope.search == scope.focus) {
            			scope.$apply(value);
            		}
            });
        });
    };
});

app.directive('whenScrolled', function() {
  return function(scope, elm, attr) {
    var raw = elm[0];

    angular.element(window).bind('scroll', function() {
      var rectObject = raw.getBoundingClientRect();
      if (rectObject.bottom === window.innerHeight) {
        scope.$apply(attr.whenScrolled);
      }
    });
  };
});     