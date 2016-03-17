module.exports = {
  host: {
    type: 'string',
    required: true
  },
  port: {
    type: 'number',
    required: true

  },
  // use SSL
  secure: {
    type: 'boolean',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  email: {
    type: 'email',
    required: true
  }
};
