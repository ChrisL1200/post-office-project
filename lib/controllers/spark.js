// curl "https://sparkapi.com/v1/standardfields" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth 8d7ificq614fn4tex3xvvfxf4" {}
// Username: dgtf.ChrisL1200
// Password: hkwmb2xt
// Auth Code: eoiq2xtex1e8wzolp46aa3qhj
// Key: 2784vbb6k8i7ejdy0vkd0r8ll
// Secret: 1r116sle8q7dnwsmbjxykilu2
// curl "https://sparkapi.com/v1/oauth2/grant" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth MY_OAUTH2_ACCESS_TOKEN" {} -H 'Content-Type: application/json' -X POST --data '{"client_id": "2784vbb6k8i7ejdy0vkd0r8ll","client_secret":  "1r116sle8q7dnwsmbjxykilu2","grant_type": "authorization_code","code": "eoiq2xtex1e8wzolp46aa3qhj", "redirect_uri": "https://post-office-project.herokuapp.com"}'
// access: eh82il8ptevtnn26db48gsb4e
// refresh: 6q23rksf8rfwc92yhd4lwwfy1
// curl "https://sparkapi.com/v1/oauth2/grant" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth MY_OAUTH2_ACCESS_TOKEN" {} -H 'Content-Type: application/json' -X POST --data '{"client_id": "2784vbb6k8i7ejdy0vkd0r8ll","client_secret":  "1r116sle8q7dnwsmbjxykilu2","grant_type": "refresh_token","refresh_token": "6q23rksf8rfwc92yhd4lwwfy1", "redirect_uri": "https://post-office-project.herokuapp.com"}'
// access
// curl "https://sparkapi.com/v1/listings" -H "X-SparkAer-Agent: SparkAPIExamples" -H "Authorization: OAuth 37a0oixrsyhj0iupcml4h2twp"
var https = require('https'),
	url = require('url'),
	querystring = require('querystring'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
	config = require('../config/config');

exports.show = function (req, res, next) {
  var getListings = function() {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var options = {
        host: 'www.sparkapi.com',
        path: '/v1/listings?' + querystring.stringify(query),
        headers: {'Authorization': 'OAuth ' + req.user.spark.accessToken, "X-SparkApi-User-Agent": "SparkAPIExamples"}
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
  };
  refreshCheck(req.user.spark.expireDate, getListings, req.user.spark.refreshToken, req.user._id);
}

exports.get = function (req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var options = {
  		host: 'www.sparkapi.com',
  		path: '/v1/listings/' + req.params.id + "?" + querystring.stringify(query),
  		headers: {'Authorization': 'OAuth ' + req.user.spark.accessToken, "X-SparkApi-User-Agent": "SparkAPIExamples"}
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

var refreshCheck = function(expireDate, callback, refreshToken, userID) {
  var currentDate = new Date();
  if(expireDate.getTime() < currentDate.getTime()) {
    //curl "https://sparkapi.com/v1/oauth2/grant" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth MY_OAUTH2_ACCESS_TOKEN" {} -H 'Content-Type: application/json' -X POST --data '{"client_id": "[client_id]","client_secret":  "[client_secret]","grant_type": "refresh_token","refresh_token": "[refresh_token]", "redirect_uri": "[redirect_uri]"}'
    var post_data = {
    client_id: config.spark.client_id,
    client_secret: config.spark.client_secret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
    redirect_uri: config.spark.redirect_uri
  };

  var options = {
      host: 'www.sparkapi.com',
      method: 'POST',
      path: '/v1/oauth2/grant',
      headers: {
        'Authorization': 'OAuth MY_OAUTH2_ACCESS_TOKEN', 
        'X-SparkApi-User-Agent': 'SparkAPIExamples', 
        'Content-Type': 'application/json'
      }
  };

  var refreshCallback = function(response) {
    var completeResponse = '';
    if(response) {
    response.on('data', function (chunk) {
        completeResponse += chunk;
    });
    response.on('end', function() {
      var parsedResponse = JSON.parse(completeResponse);
      var expirationDate = new Date();
      if(parsedResponse.expires_in) {
        expirationDate.setSeconds(expirationDate.getSeconds() + parsedResponse.expires_in);
      }
      var updatedObject = {
        spark: {
          refreshToken: parsedResponse.refresh_token || "", 
          accessToken: parsedResponse.access_token || "",
          expireDate: expirationDate
        }
      };

      User.update({_id: userID}, {$set: updatedObject }, {upsert: true}, function(err){
        console.log("Token Refreshed");
        callback();
      });
    });
  }
  };
  
  var post_req = https.request(options, refreshCallback);
  post_req.write(JSON.stringify(post_data));
  post_req.end();
  }
  else{
    callback();
  }
}
