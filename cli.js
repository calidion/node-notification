#!/usr/bin/env node
'use strict';
var meow = require('meow');

var cli = meow({
  help: [
    'Usage',
    '  notifier [--type mail] [--from name@domain.com] [--to name@domain.com] [--body body] ' +
    '[--mime (text|html)] ' +
    '[--host host] [--port port] [--secure secure] [--mail mail] ' +
    '[--password password] ' +
    '',
    'Example',
    '  notifier --type mail --from admin@sina.com --to admin@sohu.com --body "fuck you!" --mime text'
  ].join('\n')
});
var notifier = require('./index');

var options = notifier.parse(cli.flags);

var type = cli.flags['type'];
switch(type) {
  case 'mail':
    var sender = notifier.senders.mailer;
    sender.send(options.smtp, options.mail, function(error, data) {
      console.log(error, data);
    });
    break;
}
