'use strict';

/* Filters */

angular.module('activity.filters', [])
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
              if(themes.left[m].left[j].name == array[i].activity[0]) {
                selected = themes.left[m].left[j].selected;
              }
            }
            for(var k=0; k<themes.left[m].right.length; k++) {
              if(themes.left[m].right[k].name == array[i].activity[0]) {
                selected = themes.left[m].right[k].selected;              
              } 
            }
          }
          for(var m=0; m<themes.right.length; m++) {
            for(var j=0; j<themes.right[m].left.length; j++) {
              if(themes.right[m].left[j].name == array[i].activity[0]) {
                selected = themes.right[m].left[j].selected;              
              } 
            }
            for(var k=0; k<themes.right[m].right.length; k++) {
              if(themes.right[m].right[k].name == array[i].activity[0]) {
                selected = themes.right[m].right[k].selected;              
              } 
            }
          }

          var push = true; var push_word;
          for(var m=0; m<searchArray.length; m++) {
            push_word = false;

            if((array[i].price <= price) && (array[i].price > 0) && (array[i].duration <= time) && selected) {
              if( (new RegExp(searchArray[m], 'i')).test(array[i].name[0]) ){
                push_word = true;
              }
              else if( (new RegExp(searchArray[m], 'i')).test(array[i].description[0]) ) {
                push_word = true;
              }
              else if( (new RegExp(searchArray[m], 'i')).test(array[i].activity_theme[0]) ) {
                push_word = true;
              }
              else if( (new RegExp(searchArray[m], 'i')).test(array[i].activity[0]) ) {
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
