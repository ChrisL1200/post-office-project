'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Picture = mongoose.model('Picture'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    https = require('https'),
    config = require('../config/config'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    var picture = new Picture;  
    picture.img.data = fs.readFileSync(files.file[0].path);
    picture.img.contentType = files.file[0].headers['content-type'];      
    var data = JSON.parse(fields.data[0]);

    picture.save(function (err, picture) {
      data.avatarId = picture._id;
      var newUser = new User(data);
      newUser.provider = 'local';
      newUser.save(function(err) {
        if (err) return res.json(400, err);
        
        req.logIn(newUser, function(err) {
          if (err) return next(err);

          return res.json(req.user.userInfo);
        });
      });
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};

/**
 * Update current user
 */
exports.update = function(req, res) {
  User.update(req.body, {$set: req.body}, {upsert: true}, function(err){
    console.log("Success");
  });
  res.send({"success": true});
};

/**
 * Update current spark code
 */
exports.updateSpark = function(req, res) {
  //Get Access Token
  // curl "https://sparkapi.com/v1/oauth2/grant" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth MY_OAUTH2_ACCESS_TOKEN" {} -H 'Content-Type: application/json' -X POST --data '{"client_id": "2784vbb6k8i7ejdy0vkd0r8ll","client_secret":  "1r116sle8q7dnwsmbjxykilu2","grant_type": "authorization_code","code": "bn33qr6xojemdt4ns32khcpcx", "redirect_uri": "https://post-office-project.herokuapp.com"}'
  // curl "https://sparkapi.com/v1/oauth2/grant" -H "X-SparkApi-User-Agent: SparkAPIExamples" -H "Authorization: OAuth MY_OAUTH2_ACCESS_TOKEN" {} -H 'Content-Type: application/json' -X POST --data '{"client_id": "2784vbb6k8i7ejdy0vkd0r8ll","client_secret":  "1r116sle8q7dnwsmbjxykilu2","grant_type": "authorization_code","code": "edkbehe1u6hb2ycbo3rtk77am", "redirect_uri":  "https://post-office-project.herokuapp.com"}'
  var post_data = {
    client_id: config.spark.client_id,
    client_secret: config.spark.client_secret,
    code: req.body.sparkCode,
    grant_type: "authorization_code",
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

  var callback = function(response) {
    var completeResponse = '';
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
          accessToken: parsedResponse.access_token || "37a0oixrsyhj0iupcml4h2twp",
          expireDate: expirationDate
        }
      };

      User.update({_id: req.user._id}, {$set: updatedObject }, {upsert: true}, function(err){
        res.send(completeResponse);
      });
    });
  };
  
  var post_req = https.request(options, callback);
  post_req.write(JSON.stringify(post_data));
  post_req.end();
};