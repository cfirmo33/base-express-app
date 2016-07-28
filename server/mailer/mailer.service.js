var nodemailer = require('nodemailer');
var mailerConfig = require('../config/config').mailer;

var smtpUri = 'smtps://' +
  mailerConfig.userAddress + ':' + mailerConfig.password + '@' + mailerConfig.smtp;

var transporter = nodemailer.createTransport(smtpUri);

function sendMail(recipients, subject, content, senderName) {

  senderName = senderName || mailerConfig.defaultSenderName;

  var mailOptions = {
    from: senderName + ' <' + mailerConfig.userAddress + '>',
    to: recipients.join(', '),
    subject: subject,
    text: content
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log('Mail not sent: ' + error);
    }
    console.log('Mail sent: ' + info.response);
  });
}

module.exports.sendMail = sendMail;
