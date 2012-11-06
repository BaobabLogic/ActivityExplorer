'use strict';

/* Controllers */

function AppCtrl($scope, $http, $location) {
  //Search Bar   
   //Search
  $scope.search = "";
  
   //Themes
	$scope.category = "";
	$scope.themeVisible = true;
	
	$scope.themeTitleClick = function(theme, selected){
	  for(var i=0; i<theme.left.length; i++) {
	    theme.left[i].selected = selected;
	    if(theme.left[i].left != undefined) {
	      $scope.themeTitleClick(theme.left[i], selected);
	    }
	  }
	  for(var j=0; j<theme.right.length; j++) {
	    theme.right[j].selected = selected;
	    if(theme.right[j].right != undefined) {
	      $scope.themeTitleClick(theme.right[j], selected);
	    }
	  }	  
    theme.selected = selected;
	};
	$scope.themeSelected = function(theme) {
    var selected = false;
	  for(var i=0; i<theme.left.length; i++) {
	    if(theme.left[i].selected == true) {
	      selected = true;
	    }
	  }
	  for(var j=0; j<theme.right.length; j++) {
	    if(theme.right[j].selected == true) {
	      selected = true;
	    }
	  }
	  return selected;
	};
	$scope.themeSelectClick = function(theme) {
	  var selected = !theme.selected;
	  for(var i=0; i<theme.left.length; i++) {
	    theme.left[i].selected = selected;
	  }
	  for(var j=0; j<theme.right.length; j++) {
	    theme.right[j].selected = selected;
	  }
  	theme.selected = selected;
	};	
	$scope.typeSelectClick = function(type, theme) {
  	type.selected = !type.selected;
  	theme.selected= $scope.themeSelected(theme);
	};
	$scope.select = function(selected) {
	  if(!selected) {
	    return "themeSelectEmpty";
	  }
	};
	
	$scope.themeButtonClick = function(theme) {
	  $scope.themeVisible = !($scope.themeVisible);
	  $scope.theme = theme;
	};
	
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
                               { "name": "Educational Experience", "selected": true }, 
                               { "name": "Elephant Experience", "selected": true }], 
                    "right": [  { "name": "Reptile Demonstration", "selected": true }, 
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
  $scope.theme = $scope.themes.left[0];    
  
   //Refine
  $scope.budget = 10;
  $scope.duration = 10;
  $scope.selectedDate = "Aladdin";
	
	  //Sort 
	$scope.sort = "random";
	$scope.sortButtonClass = function(button) {
	  if(button == $scope.sort) {
	    return "currentSort";
	  }
	  else {
	    return "";
	  }  
	};

  //Results Section
    //Results Display Section

  var computeWidth = function(size) {
    var width = window.innerWidth;
    switch (size){
      case "/large": return width - (width-70)%456 - 70; break;
      case "/small": return width - (width-70)%246 - 70; break;
      default: return width - (width-70)%316 - 70;
    }    
  };
    
  $scope.mainStyle = function(size) {
    var width = window.innerWidth;
    switch (size){
      case "/large": return { width: (width - (width-70)%456 - 70) + 'px' }; break;
      case "/small": return { width: (width - (width-70)%246 - 70) + 'px' }; break;
      default: return { width: (width - (width-70)%316 - 70) + 'px' };
    }
  };

  var computeTop = function() {
    var height = window.innerHeight;
    return (height-600)/2; 
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
        var wide = Math.floor((width-70)/456);
        var high = Math.floor((height/368) + 2);
        return (wide*high); break;
      case "/small": 
        var wide = Math.floor((width-70)/246);
        var high = Math.floor((height/225) + 1);
        return (wide*high); break;
      default: 
        var wide = Math.floor((width-70)/316);
        var high = Math.floor((height/261) + 2);
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