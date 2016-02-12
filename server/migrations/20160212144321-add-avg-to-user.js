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
    models.User.findAll()
    .then(function(users) { 
      users.map(function(user) {
        models.Snippet.aggregate('avg', 'avg', {where: {UserId: user.id}})
        .then(function(average) {
          user.avg = average;
          user.save();
        });
      });
    });
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('Users', 'avg');
  }
};
