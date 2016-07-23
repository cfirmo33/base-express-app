var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  auth = require('./../auth/auth.service');

router.get('/', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.json(articles);
  });
});

module.exports = router;
