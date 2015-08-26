function parse(data, conf) {
  var v = require('node-form-validator');
  var error = {}
  if (!v.validate(data, conf, error)) {
    console.log(error);
    return false
  }
  return v.json.extract(data, conf);
}
module.exports = {
  send: function (smtpOptions, mailOptions, cb) {
    var nodemailer = require("nodemailer");
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
      secure: smtpOptions.secure === 'true', // use SSL
      auth: {
        user: smtpOptions.email,
        pass: smtpOptions.password
      }
    };
    console.log(smtp);

    var smtpTransport = nodemailer.createTransport(smtp);
    smtpTransport.sendMail(mailOptions, function (error, response) {
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
    create: function (from, to, subject, body, option) {
      var options = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
      };
      switch (option) {
        case 'html':
          options.html = body;
        case 'text':
        default :
          options.text = body;
          break;
      }
    },
  }
};
