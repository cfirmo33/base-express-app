var express = require('express'),
  config = require('./server/config/config'),
  db = require('./server/models');

var app = express();

require('./server/config/express')(app, config);

db.sequelize
  .sync()
  .then(function () {
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
    });
  }).catch(function (e) {
    throw new Error(e);
  });
