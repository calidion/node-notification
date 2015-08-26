var mailSender = {
  initOptions: function() {

  },
  smtp: function (smtpOptions, mailOptions, next) {
    var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP", smtpOptions);

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
      }

      // if you don't want to use this transport object anymore, uncomment following line
      smtpTransport.close(); // shut down the connection pool, no more messages
      next(error, response);
    });
  },

  sender: function (email, subject, body, next) {

    var admin = {
      host: 'smtp.exmail.qq.com',
      port: 465,
      secureConnection: true, // use SSL
      password: ')63S91fT/#:&3W',
      email: 'noreply@t1bao.com'
    };

    /*
     var admin = {
     host: 'smtp.126.com',
     port: 25,
     password: 'home12345678',
     secureConnection: false, // use SSL
     email: 'ecarenoreply@126.com'
     };
     */

    var smtpOptions = {
      host: admin.host,
      port: admin.port,
      secureConnection: admin.secureConnection, // use SSL
      auth: {
        user: admin.email,
        pass: admin.password
      }
    };

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: admin.email, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      //text: "Hello world!", // plaintext body
      html: body // html body
    };
    this.smtp(smtpOptions, mailOptions, function (err, response) {
      next(err, response);
    });
  },

  passwordReset: function (password, email, next) {
    var body = "您的数字新密码是:" + password + ",请妥善保管！";
    this.sender(email, "密码重置邮件!", body, next);
  },
  captcha: function (email, captcha, next) {
    var body = "［田一块小卖部］您的数字验证码是:" + password + ", 验证码将在30分钟后失效，请尽快使用！";
    this.sender(email, "验证码邮件!", body, next);
  },
  smsCaptcha: function(email, captcha, next) {
    var body = "［田一块小卖部］您的数字验证码是:" + captcha + ", 验证码将在30分钟后失效，请尽快使用！";
    this.sender(email, "验证码邮件!", body, next);
  },
  register: function (email, captcha, next) {
    var body = "［田一块小卖部］您的注册验证码是:" + captcha + ", 验证码将在30分钟后失效，请尽快使用！";
    this.sender(email, "［田一块小卖部］用户注册验证码邮件!", body, next);
  }
};
