'use strict';
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var notifier = require('../');

describe('node-notification node module', function() {
  it('should be able to verify mail options', function() {
    var smtpOptions = {
      host: process.env.NN_MAIL_SERVER,
      port: process.env.NN_MAIL_PORT,
      secure: 'true',
      password: process.env.NN_MAIL_PASSWORD,
      email: process.env.NN_MAIL_EMAIL
    };
    var mailOptions = {
      from: process.env.NN_MAIL_FROM,
      to: process.env.NN_MAIL_TO,
      subject: 'hello world!',
      text: 'Greeting from',
      html: '<h1><red>hood</red></h1>'
    };

    var sender = notifier.senders.mailer;
    console.log(smtpOptions);
    console.log(mailOptions);
    
    console.log(sender.smtp.parse(smtpOptions));
    console.log(sender.content.parse(mailOptions));

    assert.equal(false, !sender.smtp.parse(smtpOptions));
    assert.equal(false, !sender.content.parse(mailOptions));
  });

  it('should be able to verify sms options', function() {
    var smsOptions = {
      url: 'sandboxapp.cloopen.com',
      port: 8883,
      version: '2013-12-26',
      appId: process.env.NN_SMS_APPID,
      accountSid: process.env.NN_SMS_ACCOUNTSID,
      accountToken: process.env.NN_SMS_ACCOUNTTOKEN
    };
    var data = {
      phone: process.env.NN_SMS_PHONE,
      params: [' 云通讯测试', String(Math.round(Math.random() * 1000000))],
      templateId: '1'
    };
    var sms = notifier.senders.sms;
    assert.equal(false, !sms.config.parse(smsOptions));
    assert.equal(false, !sms.data.parse(data));
  });

  it('should be able to send email notification', function(done) {
    var mailOptions = {
      from: process.env.NN_MAIL_FROM,
      to: process.env.NN_MAIL_TO,
      subject: 'hello world!',
      text: 'Greeting from',
      html: '<h1><red>hood</red></h1>'
    };
    var smtpOptions = {
      host: process.env.NN_MAIL_SERVER,
      port: process.env.NN_MAIL_PORT,
      secure: 'true',
      password: process.env.NN_MAIL_PASSWORD,
      email: process.env.NN_MAIL_EMAIL
    };
    var sender = notifier.senders.mailer;

    sender.send(smtpOptions, mailOptions, function(error, data) {
      if (error) {
        console.error(error, data);
      }
      assert.equal(true, !error);
      assert.equal(true, data.response !== '');
      done();
    });
  });

  it('should be able to send sms notification', function(done) {
    var config = {
      url: 'sandboxapp.cloopen.com',
      port: 8883,
      version: '2013-12-26',
      appId: process.env.NN_SMS_APPID,
      accountSid: process.env.NN_SMS_ACCOUNTSID,
      accountToken: process.env.NN_SMS_ACCOUNTTOKEN
    };
    var data = {
      phone: process.env.NN_SMS_PHONE,
      params: [' 云通讯测试', String(Math.round(Math.random() * 1000000))],
      templateId: '1'
    };
    var sms = notifier.senders.sms;
    sms.send(config, data, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, ['000000', '160040', '160038'].indexOf(data.statusCode) !== -1);
      done();
    });
  });
});
