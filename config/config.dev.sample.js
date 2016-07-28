// Sample file to config.dev.js
// Create a new file called config.dev.js and paste these lines.

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var development = {
  root: rootPath,
  app: {
    name: 'express'
  },
  port: process.env.PORT || 3000,
  db: 'postgres://localhost/express-development',
  mailer: {
    smtp: 'smtp.sample-service.com',
    userAddress: 'user@sample-service.com',
    password: '',
    defaultSenderName: 'Sender Name'
  }
};

module.exports = development;
