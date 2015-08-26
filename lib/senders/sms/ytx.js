module.exports = {
  send: function(config, options, cb) {
    var ytx = require('node-ytx');
    var validator = require('node-form-validator');
    var ytxConf = require('../validation/ytx');
    var error = {};
    if (!validator.validate(config, ytxConf, error)) {
      return cb(true, error);
    }
    if (!validator.validate(options, ytxConf, error)) {
      return cb(true, error);
    }
    ytx.init(config);

//Specify a phone number which your can test

    ytx.smsTemplate(options.phone, options.params, options.templateId, cb);
  }
}
