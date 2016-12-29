var nodemailer = require('nodemailer');
var smtpConf = require('./validation/smtp');
var mailConf = require('./validation/mail');
var parse = require('./parse');

module.exports = {
  send: function (smtpOptions, mailOptions, cb) {
    var success = parse(smtpOptions, smtpConf);
    if (!success) {
      return cb(true, 'Error parse smtp info!');
    }
    success = parse(mailOptions, mailConf);
    if (!success) {
      return cb(true, 'Error parse mail options!');
    }

    var smtp = {
      host: smtpOptions.host,
      port: smtpOptions.port,
      // use SSL
      secure: smtpOptions.secure === 'true' || smtpOptions.secure === true,
      auth: {
        user: smtpOptions.email,
        pass: smtpOptions.password
      }
    };

    var smtpTransport = nodemailer.createTransport(smtp);
    smtpTransport.sendMail(mailOptions, function (error, response) {
      // if you don't want to use this transport object anymore, uncomment following line
      smtpTransport.close();
      // shut down the connection pool, no more messages
      cb(error, response);
    });
  },
  smtp: {
    parse: function (data) {
      return parse(data, smtpConf);
    }
  },
  content: {
    parse: function (data) {
      return parse(data, mailConf);
    },
    create: function (from, to, subject, body, option) {
      var options = {
        // sender address
        from: from,
        // list of receivers
        to: to,
        subject: subject
      };
      switch (option) {
        case 'html':
          options.html = body;
          break;
        case 'text':
        default:
          options.text = body;
          break;
      }
      return options;
    }
  }
};
