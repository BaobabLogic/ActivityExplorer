/*
 * Serve JSON to our AngularJS client
 */

var https = require('https'),
  	xml2js = require('xml2js');

//XML Parser

var inspect = require('eyes').inspector({maxLength: false});
var activitar;

var parser = new xml2js.Parser();
parser.addListener('end', function(result) {
    activitar = result.services.service;
    console.log('Activitar main query refreshed.');
});

// Activitar API Request paramaters
var search = {
  hostname: 'www.activitar.com',
  port: 443,
  path: '/api/services/search.xml?api_key=rTLUr5A4iGiat3Y2BjZn&per_page=99999',
  method: 'GET',
};

//Activitar main query refresh

exports.refresh = function () {
	https.get(search, function(res) {
  	console.log("statusCode: ", res.statusCode);
  	console.log("headers: ", res.headers);

  	res.on('data', function(d) {
    	parser.parseString(d);
  	});

	}).on('error', function(e) {
  	console.error(e);
	});
}

//Activity Explorer Response to Activitar Search

exports.api = function (req, res) {
  res.json(activitar);
};