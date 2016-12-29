var validator = require('node-form-validator');
function parse(data, conf) {
  var error = validator.validate(data, conf);
  if (!error) {
    return false;
  }
  if (error.code !== 0) {
    return false;
  }
  return error.data;
}
module.exports = parse;
