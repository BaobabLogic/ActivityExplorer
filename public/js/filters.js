'use strict';

/* Filters */

angular.module('activity.filters', [])
	.filter('searchFilter', function () {
    return function (array, search, theme, category, budget, duration, sort, count) {
      //Setup necesary variables
      var tempArray = []; 
      var newArray = [];
      var price;
      
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
        default: price = 9999999;
      }

      //Filter based on parameters
      for(var i=0; i<array.length; i++) {
        if( ((new RegExp(search, 'i')).test(array[i].name[0])) && (array[i].price <= price) ){
      		tempArray.push(array[i]);
      	}
      	else if( (new RegExp(search, 'i')).test(array[i].service_type[0]) && (array[i].price <= price) ) {
      		tempArray.push(array[i]);
      	}
      	else if( (new RegExp(search, 'i')).test(array[i].description[0]) && (array[i].price <= price) ) {
      		tempArray.push(array[i]);
      	}
      }

      //Sort based on parameters
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
      
      //Implement infinite scrolling based on count
      if(tempArray.length < count){
      	count = tempArray.length;
      }      

      for(var j=0; j<count; j++) {
      	newArray.push(tempArray[j]);  
      }
      
      //Return final array
    	return newArray;
    };
  });
