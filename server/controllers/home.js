var express = require('express'),
  router = express.Router(),
  auth = require('./../auth/auth.service');

router.get('/', function (req, res, next) {
  res.json('"message" : "Welcome home!"');
});

module.exports = router;
