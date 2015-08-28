'use strict';
var assert = require('assert');
var notifier = require('../');

describe('node-notification node module', function () {
  it('should be able to send email notification', function (done) {
    var mailOptions = {
      from: process.env.NN_FROM,
      to: process.env.NN_TO,
      subject: 'hello world!',
      body: 'Greeting from'
    };
    var smtpOptions = {
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: 'true',
      password: process.env.NN_PASSWORD,
      email: process.env.NN_EMAIL
    };
    var sender = notifier.senders.mailer;
    sender.send(smtpOptions, mailOptions, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.response !== "");
      done();
    });
  });

  it('should be able to send sms notification', function (done) {
    var config = {
      url: 'sandboxapp.cloopen.com',
        port: 8883,
        version: '2013-12-26',
        appId: process.env.NN_APPID,
        accountSid: process.env.NN_ACCOUNTSID,
        accountToken: process.env.NN_ACCOUNTTOKEN
    };
    var data = {
      phone: process.env.NN_PHONE,
      params: [' 云通讯测试', "" + Math.round(Math.random() * 1000000) ],
      templateId: '1'
    };
    var sms = notifier.senders.sms;
    sms.send(config, data, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.statusCode === '000000');
      done();
    });
  });
});
