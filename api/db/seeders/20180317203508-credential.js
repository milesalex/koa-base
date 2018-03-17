module.exports = {
  up(queryInterface, Sequelize) {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert(
      'credential',
      [
        {
          type: 'gdax',
          credentials: JSON.stringify({ key: 'abc', secret: 'xyz' }),
          readOnly: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type: 'coinbase',
          credentials: JSON.stringify({ key: 'abc', secret: 'xyz' }),
          readOnly: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down(queryInterface, Sequelize) {
    // Add reverting commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkDelete('Credential', null, {});
  },
};
