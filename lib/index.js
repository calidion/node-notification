'use strict';

/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

module.exports = {
  senders: {
    mailer: require('./senders/mail'),
    sms: require('./senders/sms')
  // },
  //
  // parseEmail: function(data) {
  //   var mailer = this.senders.mailer;
  //   if (!data.from) {
  //     data.from = data.email;
  //   }
  //   var smtpOption = mailer.smtp.parse(data);
  //   var mailOption = mailer.content.parse(data);
  //   return {
  //     smtp: smtpOption,
  //     mail: mailOption
  //   };
  // },
  // parseSMS: function(data) {
  //   var sms = this.senders.sms;
  //   data.version = data.v;
  //   data.templateId = String(data.templateId);
  //   var config = sms.config.parse(data);
  //   var userData = sms.data.parse(data);
  //   return {
  //     config: config,
  //     data: userData
  //   };
  }
};
