var express = require('express');
var glob = require('glob');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var appConfig = require('./app.config');

module.exports = function (app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/client'));
  app.use(methodOverride());

  app.use(session({
    secret: appConfig.secret,
    resave: true,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(flash());

  require('../config/passport')(passport); // pass passport for configuration
  require('../routes')(app, passport);

  var controllers = glob.sync(config.root + '/server/controllers/*.js');

  controllers.forEach(function (controller) {
    require(controller);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json(err);
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
  });
};
