'use strict';

/* Filters */

angular.module('activity.filters', [])
	.filter('searchFilter', function () {
    return function (array, text, count) {
      var tempArray = []; 
      var newArray = [];

      for(var i=0; i<array.length; i++) {
      	if(text == 'Explore'){
      		tempArray.push(array[i]);      		
      	}
      	else if((new RegExp(text, 'i')).test(array[i].name[0])){
      		tempArray.push(array[i]);
      	}
      	else if((new RegExp(text, 'i')).test(array[i].service_type[0])) {
      		tempArray.push(array[i]);
      	}
      	else if((new RegExp(text, 'i')).test(array[i].description[0])) {
      		tempArray.push(array[i]);
      	}
      }

      if(tempArray.length < count){
      	count = tempArray.length;
      }      

      for(var j=0; j<count; j++) {
      	newArray.push(tempArray[j]);  
      }

    	return newArray;
    };
  });
