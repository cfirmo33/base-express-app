var express = require('express');
var router = express.Router();
var db = require('../models');
var User = db.User;

router.get('/me', function (req, res, next) {
  User
  .findById(req.user.id, {
    attributes: { exclude: ['password'] }
  })
  .then(function (user) {
    return res.json(user);
  })
  .catch(function (err) {
    return res.status(500).json(err);
  });
});

module.exports = router;
