module.exports = {
  host: {
    type: 'string',
    required: true
  },
  port: {
    type: 'number',
    required: true

  },
  secure: {
    type: 'boolean',
    required: true
  }, // use SSL
  password: {
    type: 'string',
    required: true
  },
  email: {
    type: 'email',
    required: true
  }
};
