'use strict';

/* Controllers */

function SearchCtrl($scope) {
  $scope.search = "Explore";
  $scope.blur = "Explore";
  $scope.focus = "";
}

function FormCtrl($scope) {
  $scope.themes = [
    { "name": "Adventure",
      "visible": false,
      "list": ["Activity Parks", "Archery", "Bushwalks", "Hiking and Walking", "Paint Ball", "Team Building", "Tree adventures"]}, 
    { "name": "Adventure Trips",
      "visible": false,
      "list": ["4x4 Trails", "Day Drive", "Game Drives", "Horse Riding", "Mountain Biking", "Quad Biking", "Safari"]},
    { "name": "Air",
      "visible": false,
      "list": ["Aerobatic Flights", "Balloon Trips", "Flying", "Helicopter Trips", "Helicopter Charter", "Microlight Flights", "Plane Charter"]},
    { "name": "Animal Experience",
      "visible": false,
      "list": ["Aquariums", "Educational Experience", "Elephant Experience", "Reptile Demonstration", "Wildlife Experience", "Wildlife Photography"]},
    { "name": "Culture",
      "visible": false,
      "list": ["Art Experience", "Drumming", "Music Experience", "Tribal Dancing", "Wine Tasting"]},
    { "name": "Extreme Air",
      "visible": false,
      "list": ["Bungy Swing", "Parachuting", "Paragliding", "Skydiving", "Tandem Skydiving", "Zipline"]},
    { "name": "Extreme Land",
      "visible": false,
      "list": ["2 Wheel Off-Road", "Abseiling", "Rally Experience", "Sail Karts", "Sandboarding", "Wall Climbing"]},
    { "name": "Extreme Water",
      "visible": false,
      "list": ["Coasteering", "Kite Surfing", "Surfing", "Tubing", "Wakeboarding", "Waterskiing", "White River Rafting"]},
    { "name": "Tours",
      "visible": false,
      "list": ["City Tours", "Mine Tours", "Panorama Tour", "Sight Seeing Tours", "Township Tour", "Wine Tours"]},
    { "name": "Water Trips",
      "visible": false,
      "list": ["Boat Charter", "Boat Trips", "Boating", "Canoeing", "Kayaking", "Rafting", "Sailing", "Sea Kayaking"]},
    { "name": "Water Adventures",
      "visible": false,
      "list": ["Fishing", "Scuba", "Shark Cage Diving", "Stand Up Paddle", "Waterfall Adventure", "Whale Watching"]}
  ];
}

function ResultsCtrl($scope, $http, $location) {
  var size = $location.path();
  var computeWidth = function() {
    var width = window.innerWidth;
    switch (size){
      case "/large": return width - (width-70)%786 - 70; break;
      case "/small": return width - (width-70)%186 - 70; break;
      default: return width - (width-70)%315 - 70;
    }    
  };
    
  $scope.mainStyle = {
    width: computeWidth() + 'px'
  };
    
  angular.element(window).bind('resize', function() {
    $scope.mainStyle.width = computeWidth() + 'px';
    $scope.$apply();
  }); 

  $http.get('/api').
    success(function(data, status, headers, config) {
      $scope.activities = data;
      $scope.loadMore();
    });

  $scope.image = function (url) {
    return url.replace("search", "medium");
  }

  $scope.price = function (num) {
    return num.substring(0, (num.length-2));
  }

  $scope.results = [];
    
  var count = 0;
  var amount = function() {
    switch (size){
      case "/large": return 5; break;
      case "/small": return 60; break;
      default: return 20;
    }  
  };
  $scope.loadMore = function() {      
    for (var i = 0; i < amount(); i++) {
      if(count < $scope.activities.length){
        $scope.results.push($scope.activities[count]);
        count++;
      }
    }
  };
}

function PopupCtrl($scope) {
  $scope.mainStyle = {
    position: 'fixed',
    top: (window.innerHeight - 560)/2 + 'px',
    left: (window.innerWidth - 830)/2 + 'px'
  };
    
  angular.element(window).bind('resize', function() {
    $scope.mainStyle.top = (window.innerHeight - 560)/2 + 'px';
    $scope.mainStyle.left = (window.innerWidth - 830)/2 + 'px';
    $scope.$apply();
  });
}

function FooterCtrl($scope, $location) {
  $scope.viewButtonClass = function (button) {
    if($location.path() != button) {
      return "";
    }
    else {
      return "currentView";      
    }
  }
}