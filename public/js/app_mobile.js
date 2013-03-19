'use strict';


// Declare app level module which depends on filters, and services
angular.module('activity_mobile', ['activity_mobile.filters', 'activity_mobile.services', 'activity_mobile.directives', 'ui.directives', 'ui.filters']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/mobile', {
  		templateUrl: 'partials/mobile'
  	}).otherwise({
  		redirectTo: '/mobile'
  	});
  $locationProvider.html5Mode(true);
}]);


/* Controllers */

function MobileCtrl($scope, $http, $location) {
  $scope.atHome = true;
  $scope.searchMenuVis = false;

  $$('.searchButton').tap(function() {
    if($scope.searchMenuVis == false)
      $('#resultsView').animate({ top: '300px'}, 800, 'easeInOutQuart');
    else
      $('#resultsView').animate({ top: '0px'}, 800, 'easeInOutQuart');

    $scope.searchMenuVis = !$scope.searchMenuVis;
  });

  $$('.logo').tap(function() {
    if($scope.searchMenuVis == true)
      $('#resultsView').animate({ top: '0px'}, 800, 'easeInOutQuart');
 
    $scope.searchMenuVis = !$scope.searchMenuVis;
  });

  $$('.menuButton').tap(function() {
    if($scope.searchMenuVis == true)
      $('#resultsView').animate({ top: '0px'}, 800, 'easeInOutQuart');

    $scope.searchMenuVis = !$scope.searchMenuVis;
  });

  $$('#resultsView').tap(function() {
    if($scope.searchMenuVis == true)
      $('#resultsView').animate({ top: '0px'}, 800, 'easeInOutQuart');

    $scope.searchMenuVis = !$scope.searchMenuVis;
  });

  $http.get('/api').
  success(function(data, status, headers, config) {
    $scope.results = data;
    $scope.loadMore();
    $scope.loading_results = false;  
  });
}

/* Directives */

var app=angular.module('activity_mobile.directives', []);

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

app.directive('ngLoadingResult', function() {
  return {
    restrict: 'A',
    scope: true,
    link: function( scope, element, attrs ) {
      var args = attrs.ngLoadingResult.match(/[^ ]+/g);
      scope.$watch(function(){ 
        return scope.$eval(args[0]);
      }, function() {
        if(scope.$eval(args[1])) {
          element.css('display', (scope.$eval(args[0]) == '') ? 'block' : 'none');
        }
        else {
          if($("#resultDescription").prop('offsetHeight') != 0) {
            var descriptionH = $("#resultDescription").prop('offsetHeight'),
                detailsH = $("#resultDetails").prop('offsetHeight'),
                bookingH = $("#resultBooking").prop('offsetHeight');

            if((detailsH >= descriptionH) && (detailsH >= bookingH)) {
              scope.descriptionH = descriptionH;
              scope.detailsH = detailsH;
              scope.bookingH = bookingH;
              $('#resultDescription').css('top', '-' + ((detailsH - descriptionH)) +'px');
              $('#resultBooking').css('top', '-' + (detailsH - bookingH) +'px');
            }
            else if(descriptionH >= bookingH) {
              scope.descriptionH = descriptionH;
              scope.detailsH = detailsH;
              scope.bookingH = bookingH;
              $('#resultDetails').css('top', '-' + (descriptionH - detailsH) +'px');
              $('#resultBooking').css('top', '-' + (descriptionH - bookingH) +'px');
            }
            else {
              scope.descriptionH = descriptionH;
              scope.detailsH = detailsH;
              scope.bookingH = bookingH;
              $('#resultDescription').css('top', '-' + (bookingH - descriptionH) +'px');
              $('#resultDetails').css('top', '-' + (bookingH - detailsH) +'px');
            }

            $('#resultTabs').css('top', '-' + bookingH + 'px');
          }  
          element.css('display', (scope.$eval(args[0]) != '') ? 'block' : 'none');
        }        
      }, true); 
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





/* Filters */

angular.module('activity_mobile.filters', [])
.filter('searchFilter', function () {
  return function (array, search, themes, budget, duration, sort, count) {
    if(array != undefined) {
      //Setup necesary variables
      var searchArray = search.split(/\W+/); 
      var tempArray = []; 
      var newArray = [];
      var price;
      var time;
      
      //Find budget and duration values in Rand and Seconds
      switch(budget) {
        case 1: price = 100; break;
        case 2: price = 250; break;
        case 3: price = 500; break;
        case 4: price = 1000; break;
        case 5: price = 1500; break;
        case 6: price = 2000; break;
        case 7: price = 3000; break;
        case 8: price = 4000; break;
        case 9: price = 5000; break;
        default: price = 99999999;
      }
      switch(duration) {
        case 1: time = 3600; break;
        case 2: time = 7200; break;
        case 3: time = 10800; break;
        case 4: time = 14400; break;
        case 5: time = 18000; break;
        case 6: time = 21600; break;
        case 7: time = 36000; break;
        case 8: time = 86400; break;
        case 9: time = 259200; break;
        default: time = 99999999;
      }

      //Filter based on parameters
      for(var i=0; i<array.length; i++) {
        var selected = false;
        for(var m=0; m<themes.left.length; m++) {
          for(var j=0; j<themes.left[m].left.length; j++) {
            if(themes.left[m].left[j].name == array[i].service_category) {
              selected = themes.left[m].left[j].selected;
            } 
          }
          for(var k=0; k<themes.left[m].right.length; k++) {
            if(themes.left[m].right[k].name == array[i].service_category) {
              selected = themes.left[m].right[k].selected;              
            } 
          }
        }
        for(var m=0; m<themes.right.length; m++) {
          for(var j=0; j<themes.right[m].left.length; j++) {
            if(themes.right[m].left[j].name == array[i].service_category) {
              selected = themes.right[m].left[j].selected;              
            } 
          }
          for(var k=0; k<themes.right[m].right.length; k++) {
            if(themes.right[m].right[k].name == array[i].service_category) {
              selected = themes.right[m].right[k].selected;              
            } 
          }
        }

        var push = true; var push_word;
        for(var m=0; m<searchArray.length; m++) {
          push_word = false;

          if((array[i].price <= price) && (array[i].duration <= time) && selected ) {
            if( (new RegExp(searchArray[m], 'i')).test(array[i].name[0]) ){
              push_word = true;
            }
            else if( (new RegExp(searchArray[m], 'i')).test(array[i].description[0]) ) {
              push_word = true;
            }
            else if( (new RegExp(searchArray[m], 'i')).test(array[i].service_type[0]) ) {
              push_word = true;
            }
            else if( (new RegExp(searchArray[m], 'i')).test(array[i].service_category[0]) ) {
              push_word = true;
            }
            else if( (new RegExp(searchArray[m], 'i')).test(array[i].location[0]) ) {
              push_word = true;
            }
            else if( (new RegExp(searchArray[m], 'i')).test("R" + array[i].price[0]) ) {
              push_word = true;
            }
          }

          if(!push_word){
            push = false;
          } 
        }
        
        if(push) {
          tempArray.push(array[i]);
        }         
      }

      //Sort based on parameters
        //Price low to high
      if(sort == 'priceLow') {
        tempArray.sort(function(a, b) {
          return a.price - b.price;
        });
      }
        //Price high to low
      else if(sort == 'priceHigh') {
        tempArray.sort(function(a, b) {
          return b.price - a.price;
        });
      }
       //Time short to long
      else if(sort == 'timeShort') {
        tempArray.sort(function(a, b) {
          return a.duration - b.duration;
        });
      }
       //Time long to short
      else if(sort == 'timeLong') {
        tempArray.sort(function(a, b) {
          return b.duration - a.duration;
        });
      } 
      
      //Implement infinite scrolling based on count
      if(tempArray.length < count){
      	count = tempArray.length;
      }      

      for(var j=0; j<count; j++) {
      	newArray.push(tempArray[j]);  
      }
      
      //Return final array
    	return newArray;
    }  
  };
});





/* Services */

angular.module('activity_mobile.services', []).
  factory('something', function(){
    var result = {};
        
    return result;
});
