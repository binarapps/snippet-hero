'use strict';

var models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Users',
      'avg',
      {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      }
    );
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('Users', 'avg');
  }
};
