var jwt = require('jsonwebtoken');
var validateJwt = require('express-jwt')({secret: 'my_secret'});
var compose = require('composable-middleware');
var db = require('../../app/models');
var User            = db.User;

// verify jwt and attach user to req
function isAuthenticated() {
  return compose()
  // validate jwt
  .use(function (req, res, next) {
    // allow token to be passed throught query param
    if (req.query && req.query.hasOwnProperty('accessToken')) {
      req.headers.authorization = 'Bearer ' + req.query.accessToken;
    }
    // validate
    validateJwt(req, res, next);
  })
  // attach user to req
  .use(function (req, res, next) {
    User
    .findById(req.user.id)

    .then(function (user) {
      req.user = user;
      next();
    })

    .catch(function(err) {
      return res.status(500).json(err);
    });
  });
}

// creates a token
function signToken(id, roles) {
  var token = jwt.sign({id: id, roles: roles}, 'my_secret', {expiresIn: '1 hour'});
  return token;
}

module.exports.isAuthenticated = isAuthenticated;
module.exports.signToken = signToken;
