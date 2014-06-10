'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  ip: '0.0.0.0',
  port: process.env.PORT || 9000,
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  zillow: {
    zwsId: "X1-ZWz1b6epidczrf_8p8sy"
  },
  spark: {
    client_id: "2784vbb6k8i7ejdy0vkd0r8ll",
    client_secret: "1r116sle8q7dnwsmbjxykilu2",
    redirect_uri: "https://post-office-project.herokuapp.com"
  }
};