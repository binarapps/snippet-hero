'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('session', {
      sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(32)
      },
      sess: {
        allowNull: false,
        type: Sequelize.JSON
      },
      expire: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('session');
  }
};
