module.exports = function(app, passport) {
  var express = require('express'),
    router = express.Router();

  require('./controllers/home')(app);

  app.use(router);
  // login stuff
  router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

  router.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  router.get('/login', function (req, res, next) {
      res.json('variox login form');
    });

  router.get('/profile', isLoggedIn, function (req, res, next) {
      res.json('variox profile');
    });

  router.get('/signup', function (req, res, next) {
      res.json('variox signup form');
    });

  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
      console.log('auth ok');
      return next();
    }

    console.log('not authenticated, redirecting to home');
    res.redirect('/');
  }

};
