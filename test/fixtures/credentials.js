module.exports = [
  {
    model: 'Credential',
    data: {
      type: 'gdax',
      credentials: JSON.stringify({ key: 'abc', secret: 'xyz' }),
      readOnly: true,
    },
  },
  {
    model: 'Credential',
    data: {
      type: 'coinbase',
      credentials: JSON.stringify({ key: 'abc', secret: 'xyz' }),
      readOnly: true,
    },
  },
];
