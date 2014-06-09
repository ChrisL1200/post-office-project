// curl "https://sparkapi.com/v1/standardfields" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth 8d7ificq614fn4tex3xvvfxf4" {}
// Username: dgtf.ChrisL1200
// Password: hkwmb2xt
// Auth Code: eoiq2xtex1e8wzolp46aa3qhj
// Key: 2784vbb6k8i7ejdy0vkd0r8ll
// Secret: 1r116sle8q7dnwsmbjxykilu2
// curl "https://sparkapi.com/v1/oauth2/grant" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth MY_OAUTH2_ACCESS_TOKEN" {} -H 'Content-Type: application/json' -X POST --data '{"client_id": "2784vbb6k8i7ejdy0vkd0r8ll","client_secret":  "1r116sle8q7dnwsmbjxykilu2","grant_type": "authorization_code","code": "eoiq2xtex1e8wzolp46aa3qhj", "redirect_uri": "https://post-office-project.herokuapp.com"}'
// access: eh82il8ptevtnn26db48gsb4e
// refresh: 6q23rksf8rfwc92yhd4lwwfy1

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
  		headers: {'Authorization': 'OAuth eh82il8ptevtnn26db48gsb4e', "X-SparkApi-User-Agent": "SparkAPIExamples"}
	};

	var callback = function(response) {
		var completeResponse = '';
        response.on('data', function (chunk) {
            completeResponse += chunk;
        });
        response.on('end', function() {
			res.send(completeResponse);
        });
  	};

  	https.request(options, callback).end();
}

exports.get = function (req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var options = {
  		host: 'www.sparkapi.com',
  		path: '/v1/listings/' + req.params.id + "?" + querystring.stringify(query),
  		headers: {'Authorization': 'OAuth eh82il8ptevtnn26db48gsb4e', "X-SparkApi-User-Agent": "SparkAPIExamples"}
	};

	var callback = function(response) {
		var completeResponse = '';
        response.on('data', function (chunk) {
            completeResponse += chunk;
        });
        response.on('end', function() {
			res.send(completeResponse);
        });
  	};

  	https.request(options, callback).end();
}
