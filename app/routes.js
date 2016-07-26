module.exports = function(app, passport) {
var express = require('express'),
    router = express.Router(),
    auth = require('./auth/auth.service');

  app.use('/api/home', require('./controllers/home'));
  app.use('/api/auth', require('./controllers/auth')(passport));
  app.use('/api/user', auth.isAuthenticated(), require('./controllers/user'));

};
