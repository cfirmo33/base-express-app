var LocalStrategy   = require('passport-local').Strategy;
var db = require('../app/models');
var User            = db.User;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
      console.log('serializeUser');
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      console.log('deserializeUser');
      User.findById(id)
        .then(function(user) {
          console.log('deserializeUser return ok');
          done(null, user);
        })
        .catch(function(err) {
          console.log('deserializeUser err: ' + err);
          done(err, null);
        });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },

  function(req, email, password, done) {
  process.nextTick(function() {

    User.findOne({ where: { email :  email } })
      .then(function(user) {
        if (user) {
            console.log('user ja existe');
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

          var newUser = User.build({
            email    : email,
            password : User.generateHash(password)
          });

          newUser
            .save()
            .then(function() {
              console.log('return done newUser');
              return done(null, newUser);
            })
            .catch(function(error) {
              console.log('error: ' + error);
              throw error;
            });
        }
      })
      .catch(function(err) {
        console.log('error: ' + err);
        return done(err);
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true
      },
      function(req, email, password, done) {

        User.findOne({ 'email' :  email })
          .then(function(user) {
            if (!user){
              console.log('No user found.');
              return done(null, false, req.flash('loginMessage', 'No user found.'));
            }

            if (!user.validPassword(password)) {
              console.log('Oops! Wrong password.');
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            console.log('User found, password ok');
            return done(null, user);
          })
          .catch(function(err) {
            return done(err);
          });
      }));
};
