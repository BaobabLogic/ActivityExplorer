'use strict';

/* Directives */
var app=angular.module('activity.directives', []);

app.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

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

app.directive('ngAvailable', function() {
  return {
    restrict: 'A',
    scope: true,
    link: function( scope, element, attrs ) {
      scope.$watch(function(){ 
        var args = attrs.ngAvailable.match(/[^ ]+/g);
        var obj = scope.$eval(args[0]);
        if(args[1] == 'available'){
          element.css('display', ((obj != undefined) && (obj[0].inventory != undefined)) ? 'block' : 'none');
        }
        else if(args[1] == 'unavailable'){
          element.css('display', ((obj != undefined) && (obj[0].inventory == undefined)) ? 'block' : 'none');
        }
        else if(args[1] == 'loading'){
          element.css('display', (obj == undefined) ? 'block' : 'none');
        }
      }); 
    }
  };
});

app.directive('ngVisible', function() {
  return function(scope, element, attr) {
    scope.$watch(attr.ngVisible, function(visible) {
      element.css('display', visible ? 'block' : 'none');
    });
  };
});

app.directive('ngLoading', function() {
  return {
    restrict: 'A',
    scope: true,
    link: function( scope, element, attrs ) {
      scope.$watch(function(){ 
        var args = attrs.ngLoading.match(/[^ ]+/g);
        if(scope.$eval(args[1])) {
          element.css('display', (scope.$eval(args[0]) == '') ? 'block' : 'none');
        }
        else {
          element.css('display', (scope.$eval(args[0]) != '') ? 'block' : 'none');
        }
      }); 
    }
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

app.directive('slider', ['$parse', function($parse) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var parsed = $parse(attrs.slider);
            $(element).slider({
              min: 1,
              max: 10,
              step: 1,
              value: 10,
              animate: true,
              slide: function(event, ui) {
                var id = $(this).attr('id');
                var val = ui.value;
                switch (id){
                  case "budgetS": 
                    if(val==1){
                      $("#budget").html("R100 or less");
                    }
                    else if(val==2){
                      $("#budget").html("R250 or less"); 
                    }
                    else if(val==3){
                      $("#budget").html("R500 or less"); 
                    }
                    else if(val==4){
                      $("#budget").html("R1000 or less"); 
                    }
                    else if(val==5){
                      $("#budget").html("R1500 or less"); 
                    }
                    else if(val<=9){
                      $("#budget").html("R" + ((val-4)*1000) + " or less");
                    }
                    else{
                      $("#budget").html("R5000 or more"); 
                    }
                    break;
                  case "durationS": 
                    if(val==1){
                      $("#duration").html(val + " hour or less"); 
                    }
                    else if(val<=6){
                      $("#duration").html(val + " hours or less"); 
                    }
                    else if(val==7){
                      $("#duration").html(10 + " hours or less"); 
                    }
                    else if(val==8){
                      $("#duration").html((val-7) + " day or less"); 
                    }
                    else if(val<=9){
                      $("#duration").html((val-6) + " days or less");
                    }
                    else{
                      $("#duration").html((val-7) + " days or more"); 
                    }
                    break;
                }
                scope.$apply(function(){
                  parsed.assign(scope, val);
                });
              }
            });
        }
    };
}]);

app.directive('datepicker', ['$parse', function($parse) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var parsed = $parse(attrs.datepicker);
            $(element).datepicker({
                onSelect: function(dateText, inst) {
                    scope.$apply(function(){
                        parsed.assign(scope, dateText);
                    });
                }
            })
        }
    }
}]);