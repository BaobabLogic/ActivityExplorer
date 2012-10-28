'use strict';

/* Filters */

angular.module('activity.filters', [])
	.filter('searchFilter', function () {
    return function (array, text) {
      var newArray = [];

      for(var i = 0; i<array.length; i++) {
      	if(text == 'Explore'){
      		newArray.push(array[i]);      		
      	}
      	else if((new RegExp(text, 'i')).test(array[i].name[0])){
      		newArray.push(array[i]);
      	}
      	else if((new RegExp(text, 'i')).test(array[i].service_type[0])) {
      		newArray.push(array[i]);
      	}
      	else if((new RegExp(text, 'i')).test(array[i].description[0])) {
      		newArray.push(array[i]);
      	}
      }

    	return newArray;
    };
  });
