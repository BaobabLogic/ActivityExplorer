/*
 * Serve JSON to our AngularJS client
 */

var https = require('https'),
  	xml2js = require('xml2js');

//XML Parser

var inspect = require('eyes').inspector({maxLength: false});
var round = Math.round;
var activitar= []; 
var activity; 
var availability;

var parser = new xml2js.Parser();

parser.addListener('end', function(result) {
    var current = round(result.services.$.current_page);
    var total = round(result.services.$.pages); 

    console.log("\nReceived page " + current + " of " + total + " pages.");  

    if(current == 1) {
      activitar = result.services.service;
    }
    else {
      activitar = activitar.concat(result.services.service);
    }
    if(current < total) {
      refresh(current+1);
    }

    if(current == total) { 
      var i = activitar.length;
      if ( i == 0 ) return false;
      while ( --i ) {
        var j = Math.floor( Math.random() * ( i + 1 ) );
        var tempi = activitar[i];
        var tempj = activitar[j];
        activitar[i] = tempj;
        activitar[j] = tempi;
      }
			var date = new Date();
      console.log('\nActivitar MAIN query COMPLETE.\n%s', date);
    }    
});

var parser2 = new xml2js.Parser();
parser2.addListener('end', function(result) {
  activity = result.service;
});

var parser3 = new xml2js.Parser();
parser3.addListener('end', function(result) {
  availability = result.services.service;
});

//Activitar main refresh query

function refresh(page) {
  var search = {
    hostname: 'www.activitar.com',
    port: 443,
    path: '/api/services/quick_list.xml' + '?page=' + page,
    method: 'GET',
  };

  https.get(search, function(res) {
    res.on('data', function(d) {
      parser.parseString(d);
    });

  }).on('error', function(e) {
    console.error(e);
  });
}

exports.refresh = function() {
	var date = new Date();
	console.log('\nActivitar MAIN query STARTING.\n%s', date);
  refresh(1);
};

//Activitar service query

function service(serviceID) {
  var service = {
    hostname: 'www.activitar.com',
    port: 443,
    path: '/api/services/' + serviceID + '.xml?api_key=rTLUr5A4iGiat3Y2BjZn&per_page=99999',
    method: 'GET',  
  };

  https.get(service, function(res) {
    res.on('data', function(d) {
      parser2.parseString(d);
    });

  }).on('error', function(e) {
    console.error(e);
  });
}

//Activity Explorer responses to requests for Activitar API info

exports.api = function (req, res) {
  res.json(activitar);
};

exports.specificService = function (req, res) {
	var date = new Date();
	console.log("\nReceived service DETAILS query.\n%s\nRequest's service ID: %d",
		 date, req.params.id);

  var serviceID = req.params.id;
  var date = req.params.date;
  if(serviceID != 'undefined') {
    var service = {
      hostname: 'www.activitar.com',
      port: 443,
      path: '/api/services/' + serviceID + '.xml?api_key=rTLUr5A4iGiat3Y2BjZn&date=' + date,
      method: 'GET',  
    };

    https.get(service, function(res2) {
      res2.on('data', function(d) {
        parser2.parseString(d);
        res.json(activity);
				
				date = new Date();
				console.log("\nDETAILS query COMPLETE.\n%s", date);
      });

    }).on('error', function(e) {
      console.error(e);
    });
  }
  else {
    res.json(activity);
  }
};

exports.availabilityCheck = function (req, res) {
	var date = new Date();
	console.log("\nReceived AVAILABILITY query.\n%s\nRequest's service ID: %d" +
		 "\nRequest's adults param: %d\nRequest's children param: %d\nRequest's date param: %s",
		 date, req.params.id, req.params.adults, req.params.children, req.params.date);

  var adults = req.params.adults;
  var children = req.params.children;
  var date = req.params.date;
  var id = req.params.id;
  if(id != 'undefined'){
    var service = {
      hostname: 'www.activitar.com',
      port: 443,
      path: '/api/services/available.xml?api_key=rTLUr5A4iGiat3Y2BjZn&adults=' + 
        adults + '&children=' + children + '&date=' +  date + '&ids=' + id,
      method: 'GET',  
    };

    https.get(service, function(res2) {
      res2.on('data', function(d) {
        parser3.parseString(d);
        res.json(availability);

				date = new Date();
				console.log("\nAVAILABILITY query COMPLETE.\n%s", date);
      });

    }).on('error', function(e) {
      console.error(e);
    });
  }
  else {
    res.json(availability);
  } 
};
