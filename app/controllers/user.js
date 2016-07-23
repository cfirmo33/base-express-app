var express = require('express'),
  router = express.Router(),
  db = require('../models');

  router.get('/me', function (req, res, next) {
      res.json('variox profile');
    });

module.exports = router;
