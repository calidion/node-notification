/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

function parse(data, conf) {
  var v = require('node-form-validator');
  var error = {};
  if (!v.validate(data, conf, error)) {
    console.error(error);
    return false;
  }
  return v.json.extract(data, conf);
}
module.exports = {
  send: function(smtpOptions, mailOptions, cb) {
    var nodemailer = require('nodemailer');
    var v = require('node-form-validator');
    var smtpConf = require('./validation/smtp');
    var mailConf = require('./validation/mail');
    var error = {};

    if (!v.validate(smtpOptions, smtpConf, error)) {
      return cb(true, error);
    }

    if (!v.validate(mailOptions, mailConf, error)) {
      return cb(true, error);
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
    smtpTransport.sendMail(mailOptions, function(error, response) {
      // if you don't want to use this transport object anymore, uncomment following line
      smtpTransport.close();
      // shut down the connection pool, no more messages
      cb(error, response);
    });
  },
  smtp: {
    parse: function(data) {
      return parse(data, require('./validation/smtp'));
    }
  },
  content: {
    parse: function(data) {
      return parse(data, require('./validation/mail'));
    },
    create: function(from, to, subject, body, option) {
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
