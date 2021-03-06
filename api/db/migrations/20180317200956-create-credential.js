module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('credentials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      credentials: {
        type: Sequelize.JSONB,
      },
      read_only: {
        type: Sequelize.BOOLEAN,
      },
      last_refresh_request: {
        type: Sequelize.DATE,
      },
      last_refresh_error: {
        type: Sequelize.DATE,
      },
      last_refresh_success: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('credentials');
  },
};
