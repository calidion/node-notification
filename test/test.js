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
});
