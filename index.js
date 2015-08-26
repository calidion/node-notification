'use strict';
module.exports = {
  senders: {
    mailer: require('./lib/senders/mail'),
    sms: require('./lib/senders/sms')
  },

  parseEmail: function (data) {

    var mailer = this.senders.mailer;
    if (!data.from) {
      data.from = data.email;
    }
    var smtpOption = mailer.smtp.parse(data);
    var mailOption = mailer.content.parse(data);
    return {
      smtp: smtpOption,
      mail: mailOption
    };
  },
  parseSMS: function (data) {
    var sms = this.senders.sms;
    data.version = data.v;
    data.templateId = "" + data.templateId;
    var config = sms.config.parse(data);
    console.log(config);
    var userData = sms.data.parse(data);
    return {
      config: config,
      data: userData
    };
  }
};
