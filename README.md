#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Node Notification with Email, SMS.


## Install

```sh
$ npm install --save node-notification
```


## Usage

```js
var notifier = require('node-notification');
//短信
var mailOptions = {
  from: process.env.NN_FROM,
  to: process.env.NN_TO,
  subject: 'hello world!',
  body: 'Greeting from'
};
var smtpOptions = {
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: 'true',
  password: process.env.NN_PASSWORD,
  email: process.env.NN_EMAIL
};
var sender = notifier.senders.mailer;
sender.send(smtpOptions, mailOptions, function(error, data) {
  //data:返回的json数据
});

//短消息    
var config = {
  url: 'sandboxapp.cloopen.com',
  port: 8883,
  version: '2013-12-26',
  appId: process.env.NN_APPID,
  accountSid: process.env.NN_ACCOUNTSID,
  accountToken: process.env.NN_ACCOUNTTOKEN
};
var data = {
  phone: process.env.NN_PHONE,
  params: [' 云通讯测试', "" + Math.round(Math.random() * 1000000) ],
  templateId: '1'
};
var sms = notifier.senders.sms;
sms.send(config, data, function(error, data) {
  assert.equal(true, !error);
  assert.equal(true, data.statusCode === '000000');
  done();
});
```


## License

MIT © [JSSDKCN](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-notification.svg
[npm-url]: https://npmjs.org/package/node-notification
[travis-image]: https://travis-ci.org/JSSDKCN/node-notification.svg?branch=master
[travis-url]: https://travis-ci.org/JSSDKCN/node-notification
[daviddm-image]: https://david-dm.org/JSSDKCN/node-notification.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/JSSDKCN/node-notification
