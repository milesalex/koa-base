module.exports = {
  up(queryInterface) {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      'credential',
      [
        {
          type: 'gdax',
          credentials: JSON.stringify({ key: 'abc', secret: 'xyz' }),
          read_only: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: 'coinbase',
          credentials: JSON.stringify({ key: 'abc', secret: 'xyz' }),
          read_only: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down(queryInterface) {
    // Add reverting commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete('Credential', null, {});
  },
};
