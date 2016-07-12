var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/home', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.json(articles);
  });
});
