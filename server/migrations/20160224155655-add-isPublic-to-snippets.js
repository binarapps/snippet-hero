'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Snippets', 'isPublic', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('Snippets', 'isPublic');
  }
};
