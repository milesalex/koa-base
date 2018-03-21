module.exports = [
  {
    model: 'Credential',
    data: {
      type: 'gdax',
      credentials: { key: 'abc', secret: 'xyz' },
      readOnly: true,
    },
  },
  {
    model: 'Credential',
    data: {
      type: 'coinbase',
      credentials: { key: 'abc', secret: 'xyz' },
      readOnly: true,
    },
  },
];
