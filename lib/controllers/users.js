'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Picture = mongoose.model('Picture'),
    multiparty = require('multiparty'),
    fs = require('fs'),
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