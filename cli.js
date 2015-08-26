#!/usr/bin/env node
'use strict';
var meow = require('meow');

var cli = meow({
  help: [
    'Usage',
    '  notifier [--type (email|sms)] [--from name@domain.com] [--to name@domain.com] [--body body] ' +
    '[--mime (text|html)] ' +
    '[--host host] [--port port] [--secure secure] [--mail mail] ' +
    '[--password password] ' +
    '',
    'Example',
    '  notifier --type email --host sohu.com --port 80 --secure true --email no@sdfs.com --password password ' +
    ' --to to@email.com --subject "hello world!" --body "Greeting from"' +
    '' +
    'or' +
    '  notifier --type sms --url url --port 8883 --v "2013-12-26" --appId appId' +
    ' --account-sid accountSid --account-token accountToken --phone phone --templateId "1"' +
    ' --params param1 --params param2 --params param3'
  ].join('\n')
});
var notifier = require('./index');


var type = cli.flags['type'];
console.log(cli.flags);
var options;
switch(type) {
  case 'sms':
    console.log('inside sms');
    var sender = notifier.senders.sms;
    options = notifier.parseSMS(cli.flags);
    console.log(options);
    sender.send(options.config, options.data, function(error, data) {
      console.log(error, data);
    });
    break;
  case 'email':
    var sender = notifier.senders.mailer;
    options = notifier.parseEmail(cli.flags);
    sender.send(options.smtp, options.mail, function(error, data) {
      console.log(error, data);
    });
    break;
}

