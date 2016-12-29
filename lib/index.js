'use strict';

module.exports = {
  senders: {
    mailer: require('./senders/mail'),
    sms: require('./senders/sms')
  }
};
