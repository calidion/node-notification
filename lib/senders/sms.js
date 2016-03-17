/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

function parse(data, conf) {
  var v = require('node-form-validator');
  var error = {};
  if (!v.validate(data, conf, error)) {
    console.error(error);
    return false;
  }
  return v.json.extract(data, conf);
}

module.exports = {
  send: function(config, options, cb) {
    var ytx = require('node-ytx');
    var validator = require('node-form-validator');
    var ytxConf = require('./validation/ytx');
    var ytxDataConf = require('./validation/ytx-data');
    var error = {};
    if (!validator.validate(config, ytxConf, error)) {
      return cb(true, error);
    }
    if (!validator.validate(options, ytxDataConf, error)) {
      return cb(true, error);
    }
    ytx.init(config);

    // Specify a phone number which your can test
    ytx.smsTemplate(options.phone, options.params, options.templateId, function(error, data) {
      if (error) {
        return cb(true, data);
      }
      var json;
      try {
        json = JSON.parse(String(data));

        cb(false, json);
      } catch (e) {
        console.log(e);
        cb(true, e);
      }
    });
  },
  config: {
    parse: function(data) {
      return parse(data, require('./validation/ytx'));
    }
  },
  data: {
    parse: function(data) {
      return parse(data, require('./validation/ytx-data'));
    }
  }
};
