'use strict';

/* Filters */

angular.module('activity.filters', [])
	.filter('searchFilter', function () {
    return function (array, search, theme, category, budget, duration, sort, count) {
      var tempArray = []; 
      var newArray = [];
      
      console.log(budget);
      console.log(duration);

      for(var i=0; i<array.length; i++) {
        if((new RegExp(search, 'i')).test(array[i].name[0])){
      		tempArray.push(array[i]);
      	}
      	else if((new RegExp(search, 'i')).test(array[i].service_type[0])) {
      		tempArray.push(array[i]);
      	}
      	else if((new RegExp(search, 'i')).test(array[i].description[0])) {
      		tempArray.push(array[i]);
      	}
      }

      if(sort == 'priceLow') {
        tempArray.sort(function(a, b) {
          return a.price - b.price;
        });
      }
      else if(sort == 'priceHigh') {
        tempArray.sort(function(a, b) {
          return b.price - a.price;
        });
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
