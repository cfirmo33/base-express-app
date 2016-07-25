var express = require('express'),
router = express.Router(),
db = require('../models'),
auth = require('../auth/auth.service');

module.exports = function (passport) {
  router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        var error = err || info;
        if (error) {
          return res.status(401).json({err: error});
        }

        return res.json({});
    })(req, res, next);
  });

  router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      var error = err || info;
      if (error) {
        return res.status(401).json({err: error});
      }
      if (!user) {
        return res.status(404).json({err: 'Something went wrong'});
      }

      var token = auth.signToken(user.id, ['ROLE_USER']);
      return res.json({token: token});

    })(req, res, next);
  });

  return router;
};
