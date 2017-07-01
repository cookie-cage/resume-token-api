const schema = {
  properties: {
    owner: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
  },
  required: [
    'owner',
  ],
};

module.exports = schema;
