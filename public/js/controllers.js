'use strict';

/* Controllers */

function AppCtrl($scope, $http, $location) {
  //Search Bar 

  $scope.search = "Explore";
  $scope.blur = "Explore";
  $scope.focus = "";
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


  //Results Section
    //Results Display Section

  var computeWidth = function(size) {
    var width = window.innerWidth;
    switch (size){
      case "/large": return width - (width-70)%786 - 70; break;
      case "/small": return width - (width-70)%186 - 70; break;
      default: return width - (width-70)%315 - 70;
    }    
  };
    
  $scope.mainStyle = function(size) {
    var width = window.innerWidth;
    switch (size){
      case "/large": return { width: (width - (width-70)%786 - 70) + 'px' }; break;
      case "/small": return { width: (width - (width-70)%186 - 70) + 'px' }; break;
      default: return { width: (width - (width-70)%315 - 70) + 'px' };
    }
  };

  var computeTop = function() {
    var height = window.innerHeight;
    return (height-560)/2; 
  };

  var computeLeft = function() {
    var width = window.innerWidth;
    return (width-860)/2; 
  };
    
  $scope.activityStyle = {
    top: computeTop() + 'px',
    left: computeLeft() + 'px'
  };

  $scope.amount = function(size) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    switch (size){
      case "/large": 
        var wide = Math.floor((width-70)/786);
        var high = Math.floor((height/566) + 2);
        return (wide*high); break;
      case "/small": 
        var wide = Math.floor((width-70)/186);
        var high = Math.floor((height/166) + 1);
        return (wide*high); break;
      default: 
        var wide = Math.floor((width-70)/315);
        var high = Math.floor((height/251) + 2);
        return (wide*high);
    }  
  };

  $scope.count = 0;

  $scope.loadMore = function() {
    $scope.count++;
  };

  $scope.applyDisplaySettings = function() {
    $scope.activityStyle.top = computeTop() + 'px';
    $scope.activityStyle.left = computeLeft() + 'px';
    $scope.popUpStyle.top = (window.innerHeight - 560)/2 + 'px';
    $scope.popUpStyle.left = (window.innerWidth - 830)/2 + 'px';
    $scope.$apply();    
  }
    
  angular.element(window).bind('resize', function() {
    $scope.applyDisplaySettings();
  });

   //Results Data Section    

  $http.get('/api').
    success(function(data, status, headers, config) {
      $scope.results = data;
      $scope.loadMore();
    });

  $scope.image = function (url) {
    if (typeof url == 'string' || url instanceof String) {
      return url.replace("search", "medium");
    }
    else {
      return "";
    }    
  }

  $scope.price = function (num) {
    return num.substring(0, (num.length-2));
  }


  //PopUps
    //Activity PopUps

  $scope.visible = false;

  $scope.popUpResult = function(id) { 
    $scope.activity = "";
    $http.get('/api/' + id).
      success(function(data, status, headers, config) {
        $scope.activity = data;
      }); 
    $scope.visible = !$scope.visible;
  };

    //Footer PopUps

  $scope.popUpStyle = {
    position: 'fixed',
    top: (window.innerHeight - 560)/2 + 'px',
    left: (window.innerWidth - 830)/2 + 'px'
  };


  //Footer

  $scope.viewButtonClass = function (button) {
    if($location.path() != button) {
      return "";
    }
    else {
      return "currentView";      
    }
  }
}