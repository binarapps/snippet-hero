'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Snippets',
      'avg',
      {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Snippets', 'avg');
  }
};
