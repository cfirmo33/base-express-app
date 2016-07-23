module.exports = function(app, passport) {
  var express = require('express'),
    router = express.Router(),
    auth = require('./auth/auth.service');

  app.use('/api/home', require('./controllers/home'));
  app.use('/api/auth', require('./controllers/auth'))
  app.use('/api/user', auth.isLoggedIn, require('./controllers/user'));

};
