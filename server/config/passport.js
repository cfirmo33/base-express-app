var LocalStrategy   = require('passport-local').Strategy;
var db = require('../models');
var User            = db.User;


function login(req, email, password, done) {
  User
  .findOne({where: {'email' :  email }})
  .then(function(user) {
    if (!user){
      console.log('No user found.');
      return done(null, false, {message: 'Invalid user or password'});
    }

    if (!user.validPassword(password)) {
      console.log('Oops! Wrong password.');
      return done(null, false, 'Invalid user or password');
    }

    console.log('User found, password ok');
    return done(null, user);
  })

  .catch(function(err) {
    return done(err);
  });
}

function signup(req, email, password, done) {
  User
  .findOne({ where: { email :  email } })
  .then(function(user) {

    if (user) {
      // email already taken
      return done(null, false, 'User already taken');
    }

    var newUser = User.build({
      email    : email,
      password : User.generateHash(password)
    });

    newUser
    .save()
    .then(function() {
      return done(null, newUser);
    })

    .catch(function(error) {
      throw error;
    });
  })

  .catch(function(err) {
    return done(err);
  });
}


module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, signup));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, login));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      done(err, null);
    });
  });
};
