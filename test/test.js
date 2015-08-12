'use strict';
var assert = require('assert');
var nodeNotification = require('../');

describe('node-notification node module', function () {
  it('first test', function () {
    nodeNotification();
    assert(true, 'first test passed.');
  });
});
