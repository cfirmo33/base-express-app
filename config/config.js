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
    db: 'postgres://localhost/express-test',
    mailer: {
      smtp: 'smtp.sample-service.com',
      userAddress: 'user@sample-service.com',
      password: '',
      defaultSenderName: 'Sender Name'
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'express'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/express-production',
    mailer: {
      smtp: 'smtp.sample-service.com',
      userAddress: 'user@sample-service.com',
      password: '',
      defaultSenderName: 'Sender Name'
    }
  }
};

module.exports = config[env];
