'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'encryptedPassword',
      {
        type: Sequelize.STRING
      }
    );

    queryInterface.addColumn(
      'Users',
      'passwordSalt',
      {
        type: Sequelize.STRING
      }
    );
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('Users', 'encryptedPassword');
    queryInterface.removeColumn('Users', 'passwordSalt');
  }
};
