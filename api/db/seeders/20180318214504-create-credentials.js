module.exports = {
  up(queryInterface, Sequelize) {
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

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('credential', null, {});
  },
};
