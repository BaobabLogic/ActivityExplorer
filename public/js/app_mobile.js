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
  $scope.loadingResults = true;
  $scope.loadingActivity = true;
  $scope.search = "";
  $scope.budget = 10;
  $scope.duration = 10;
  $scope.sort = "random";
  $scope.activity = "";
  $scope.available = "";
  $scope.themesSelectVis = true;
  $scope.refineSelectVis = false;
  $scope.sortSelectVis = false;
  $scope.detailsSelectVis = true;
  $scope.bookSelectVis = false;
  $scope.reviewsSelectVis = false;

  $scope.themes = { 
    "left":    [
                  { 
                    "name": "Adventure",
                    "left": [  { "name": "Activity Parks", "selected": true }, 
                               { "name": "Archery", "selected": true },
                               { "name": "Bushwalks", "selected": true }, 
                               { "name": "Hiking and Walking", "selected": true }],
                    "right": [  { "name": "Paint Ball", "selected": true },
                                { "name": "Team Building", "selected": true }, 
                                { "name": "Tree adventures", "selected": true }],
                    "selected": true            
                  }, 
                  { 
                    "name": "Adventure Trips",
                    "left": [  { "name": "4x4 Trails", "selected": true },
                               { "name": "Day Drive", "selected": true },
                               { "name": "Game Drives", "selected": true }, 
                               { "name": "Horse Riding", "selected": true }], 
                    "right": [  { "name": "Mountain Biking", "selected": true }, 
                                { "name": "Quad Biking", "selected": true }, 
                                { "name": "Safari", "selected": true }],
                    "selected": true
                  },
                  { 
                    "name": "Air",
                    "left": [  { "name": "Aerobatic Flights", "selected": true }, 
                               { "name": "Balloon Trips", "selected": true }, 
                               { "name": "Flying", "selected": true }, 
                               { "name": "Helicopter Trips", "selected": true }],
                    "right": [  { "name": "Helicopter Charter", "selected": true }, 
                                { "name": "Microlight Flights", "selected": true }, 
                                { "name": "Plane Charter", "selected": true }],
                    "selected": true
                  },
                  { 
                    "name": "Animal Experience",
                    "left": [  { "name": "Aquariums", "selected": true },  
                               { "name": "Animal Interaction", "selected": true },
                               { "name": "Bird Watching", "selected": true },
                               { "name": "Educational Experience", "selected": true }], 
                    "right": [  { "name": "Elephant Experience", "selected": true },
                                { "name": "Reptile Demonstration", "selected": true }, 
                                { "name": "Wildlife Experience", "selected": true }, 
                                { "name": "Wildlife Photography", "selected": true }],
                    "selected": true
                  },
                  { 
                    "name": "Culture",
                    "left": [  { "name": "Art Experience", "selected": true }, 
                               { "name": "Drumming", "selected": true }, 
                               { "name": "Music Experience", "selected": true }],
                    "right": [  { "name": "Tribal Dancing", "selected": true }, 
                                { "name": "Wine Tasting", "selected": true }],
                    "selected": true
                  },
              ],
    "right":  [  
                { 
                  "name": "Extreme Air",
                  "left": [ { "name": "Bungy Swing", "selected": true }, 
                            { "name": "Parachuting", "selected": true }, 
                            { "name": "Paragliding", "selected": true }],
                  "right": [  { "name": "Skydiving", "selected": true }, 
                              { "name": "Tandem Skydiving", "selected": true }, 
                              { "name": "Zipline", "selected": true }],
                  "selected": true
                },
                { 
                  "name": "Extreme Land",
                  "left": [  { "name": "2 Wheel Off-Road", "selected": true }, 
                             { "name": "Abseiling", "selected": true }, 
                             { "name": "Rally Experience", "selected": true }],
                  "right": [  { "name": "Sail Karts", "selected": true }, 
                              { "name": "Sandboarding", "selected": true }, 
                              { "name": "Wall Climbing", "selected": true }],
                  "selected": true
                },
                { 
                  "name": "Extreme Water",
                  "left": [  { "name": "Coasteering", "selected": true }, 
                             { "name": "Kite Surfing", "selected": true }, 
                             { "name": "Surfing", "selected": true }, 
                             { "name": "Tubing", "selected": true }],
                  "right": [  { "name": "Wakeboarding", "selected": true }, 
                              { "name": "Waterskiing", "selected": true }, 
                              { "name": "White River Rafting", "selected": true }],
                  "selected": true
                },
                { 
                  "name": "Tours",
                  "left": [  { "name": "City Tours", "selected": true }, 
                             { "name": "Mine Tours", "selected": true }, 
                             { "name": "Panorama Tour", "selected": true }],
                  "right": [  { "name": "Sight Seeing Tours", "selected": true }, 
                              { "name": "Township Tour", "selected": true }, 
                              { "name": "Wine Tours", "selected": true }],
                  "selected": true
                },
                { 
                  "name": "Water Trips",
                  "left": [  { "name": "Boat Charter", "selected": true }, 
                             { "name": "Boat Trips", "selected": true }, 
                             { "name": "Boating", "selected": true }, 
                             { "name": "Canoeing", "selected": true }],
                  "right": [  { "name": "Kayaking", "selected": true }, 
                             { "name": "Rafting", "selected": true }, 
                             { "name": "Sailing", "selected": true }, 
                             { "name": "Sea Kayaking", "selected": true }],
                 "selected": true
                },
                { 
                  "name": "Water Adventures",
                  "left": [  { "name": "Fishing", "selected": true }, 
                             { "name": "Scuba", "selected": true }, 
                            { "name": "Shark Cage Diving", "selected": true }],
                  "right": [  { "name": "Stand Up Paddle", "selected": true }, 
                              { "name": "Waterfall Adventure", "selected": true }, 
                              { "name": "Whale Watching", "selected": true }],
                  "selected": true
                }
            ],
    "selected": true      
  };  

  $http.get('/api').
    success(function(data, status, headers, config) {
      $scope.results = data;
      $scope.loadingResults = false;  
    });    

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

  $$('#searchMenu').swipeUp(function() {
    if($scope.searchMenuVis == true)
      $('#resultsView').animate({ top: '0px'}, 800, 'easeInOutQuart');

    $scope.searchMenuVis = !$scope.searchMenuVis;
  });

  $$('#resultsView').swipeUp(function() {
    if($scope.searchMenuVis == true)
      $('#resultsView').animate({ top: '0px'}, 800, 'easeInOutQuart');

    $scope.searchMenuVis = !$scope.searchMenuVis;
  });

  $$('.themesSelect').tap(function() {
    $scope.themesSelectVis = true;
    $scope.refineSelectVis = false;
    $scope.sortSelectVis = false;
  });

  $$('.refineSelect').tap(function() {    
    $scope.themesSelectVis = false;
    $scope.refineSelectVis = true;
    $scope.sortSelectVis = false;
  });

  $$('.sortSelect').tap(function() {
    $scope.themesSelectVis = false;
    $scope.refineSelectVis = false;
    $scope.sortSelectVis = true;
  });

  $$('.detailsSelect').tap(function() {
    $scope.detailsSelectVis = true;
    $scope.bookSelectVis = false;
    $scope.reviewsSelectVis = false;
  });

  $$('.bookSelect').tap(function() {    
    $scope.detailsSelectVis = false;
    $scope.bookSelectVis = true;
    $scope.reviewsSelectVis = false;
  });

  $$('.reviewsSelect').tap(function() {
    $scope.detailsSelectVis = false;
    $scope.bookSelectVis = false;
    $scope.reviewsSelectVis = true;
  });

  var myDate = new Date();
  myDate.setDate(myDate.getDate()+2);
  $scope.selectedDate = myDate;

  $scope.adults = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  $scope.children = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  $scope.selectedAdults = 1;
  $scope.selectedChildren = 0;

  $$('.result').tap(function(){
    $scope.activity = "";
    $http.get('/api/service/' + this.id).
      success(function(data, status, headers, config) {
        $scope.activity = data;
        $scope.loadingActivity = false;
        $scope.availabilityCheck(1, 0, $scope.selectedDate, $scope.activity.id);
      });
    Lungo.Router.section('activity'); 
  });

  $scope.availabilityCheck = function(adults, children, date, id) { 
    $scope.available = "";
    $scope.availabilityError = false;
    $scope.availabilityCanceled = false;
    $scope.availabilityLoading = true;
    if(adults == undefined) {adults = 1}
    if(children == undefined) {children = 0}
    $http.get('/api/available/' + adults + '/' + children + '/' + '2013-04-22' + '/' + id).
      success(function(data, status, headers, config) {
        $scope.available = data;  
        if(data[0].inventories[0].inventory != undefined) {
          $scope.selectedTimeslot = data[0].inventories[0].inventory[0];
          $scope.timeslots = data[0].inventories[0].inventory;
        } 
        $scope.availabilityDone = true;  
        $scope.availabilityLoading = false;  
      }).
      error(function(data, status, headers, config) {
        $scope.availabilityError = true;
      }); 
  };

  $$('.activityBack').tap(function(){
    Lungo.Router.back();
    $scope.loadingActivity = true;
  });

  $scope.image = function (url) {
    if (typeof url == 'string' || url instanceof String) {
      return url.replace("thumb", "medium");
    }
    else {
      return "";
    }    
  }

  $scope.price = function (num) {
    var price = 0;
    if (num != undefined) {
      price = num.substring(0, (num.length-2));
    }
    return price;
  }

  $scope.getDuration = function (time) {
    var duration = 1;
    if (time != undefined) {
      duration = Math.round(time/360) / 10;
    }
    return duration;
  }
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
