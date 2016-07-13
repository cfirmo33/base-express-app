var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    development = require('./config.dev'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: development,

  test: {
    root: rootPath,
    app: {
      name: 'express'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/express-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/express-production'
  }
};

module.exports = config[env];
