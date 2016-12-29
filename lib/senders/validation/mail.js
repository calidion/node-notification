module.exports = {
  from: {
    type: 'email',
    required: true
  },
  to: {
    type: 'email',
    required: true
  },
  subject: {
    type: 'string'
  },
  body: {
    type: 'text'
  }
};
