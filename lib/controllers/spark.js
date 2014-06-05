// curl "https://sparkapi.com/v1/standardfields" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth 8d7ificq614fn4tex3xvvfxf4" {}

var https = require('https'),
	url = require('url'),
	querystring = require('querystring'),
	config = require('../config/config');

exports.show = function (req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var options = {
  		host: 'www.sparkapi.com',
  		path: '/v1/listings?' + querystring.stringify(query),
  		headers: {'Authorization': 'OAuth 8d7ificq614fn4tex3xvvfxf4', "X-SparkApi-User-Agent": "SparkAPIExamples"}
	};

	var callback = function(response) {
		var completeResponse = '';
		console.log('/v1/listings?' + querystring.stringify(query));
        response.on('data', function (chunk) {
            completeResponse += chunk;
        });
        response.on('end', function() {
			res.send(completeResponse);
        });
  	};

  	https.request(options, callback).end();
}
