/*
 * Serve JSON to our AngularJS client
 */

var https = require('https'),
  	xml2js = require('xml2js');

//XML Parser

var inspect = require('eyes').inspector({maxLength: false});
var activitar; var activity;

var parser = new xml2js.Parser();
parser.addListener('end', function(result) {
    activitar = result.services.service;
    var i = activitar.length;
    if ( i == 0 ) return false;
    while ( --i ) {
      var j = Math.floor( Math.random() * ( i + 1 ) );
      var tempi = activitar[i];
      var tempj = activitar[j];
      activitar[i] = tempj;
      activitar[j] = tempi;
    }
    activitar = result.services.service;
    console.log('Activitar main query response received.');
});

var parser2 = new xml2js.Parser();
parser2.addListener('end', function(result) {
    activity = result.service;
});

// Activitar API Request paramaters
var search = {
  hostname: 'www.activitar.com',
  port: 443,
  path: '/api/services/search.xml?api_key=rTLUr5A4iGiat3Y2BjZn&per_page=99999',
  method: 'GET',
};

//Activitar main refresh query

exports.refresh = function () {
	https.get(search, function(res) {
  	res.on('data', function(d) {
    	parser.parseString(d);
  	});

	}).on('error', function(e) {
  	console.error(e);
	});
}

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
  var serviceID = req.params.id;
  var service = {
    hostname: 'www.activitar.com',
    port: 443,
    path: '/api/services/' + serviceID + '.xml?api_key=rTLUr5A4iGiat3Y2BjZn&per_page=99999',
    method: 'GET',  
  };

  https.get(service, function(res2) {
    res2.on('data', function(d) {
      parser2.parseString(d);
      res.json(activity);
    });

  }).on('error', function(e) {
    console.error(e);
  });
};