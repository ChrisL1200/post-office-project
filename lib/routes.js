'use strict';

var avatar = require('./controllers/avatar'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    zillow = require('./controllers/zillow'),
    spark = require('./controllers/spark'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {
  // Images
  app.route('/api/avatar/:id')
    .get(avatar.show);
  
  // Users
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  // Session
  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);
  
  // Zillow
  app.route('/api/zillow')
    .get(zillow.show);

  // Spark
  app.route('/api/spark')
    .get(spark.show);
    
  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};