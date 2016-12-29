var parse = require('./parse');
var ytx = require('node-ytx');
var ytxConf = require('./validation/ytx');
var ytxDataConf = require('./validation/ytx-data');

module.exports = {
  send: function (config, options, cb) {
    var success = parse(config, ytxConf);
    if (!success) {
      return cb(true, 'Error parse sms conf!');
    }
    success = parse(options, ytxDataConf);
    if (!success) {
      return cb(true, 'Error parse options!');
    }
    ytx.init(config);

    // Specify a phone number which your can test
    ytx.smsTemplate(options.phone, options.params, options.templateId, function (error, data) {
      if (error) {
        console.error(error, data);
        return cb(true, data);
      }
      var json;
      try {
        json = JSON.parse(String(data));

        cb(false, json);
      } catch (e) {
        console.error(e);
        cb(true, e);
      }
    });
  },
  config: {
    parse: function (data) {
      return parse(data, ytxConf);
    }
  },
  data: {
    parse: function (data) {
      return parse(data, ytxDataConf);
    }
  }
};
