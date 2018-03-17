module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Credentials', {
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
        type: Sequelize.JSON,
      },
      readOnly: {
        type: Sequelize.BOOLEAN,
      },
      lastRefreshRequest: {
        type: Sequelize.DATE,
      },
      lastRefreshError: {
        type: Sequelize.DATE,
      },
      lastRefreshSuccess: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Credentials');
  },
};
