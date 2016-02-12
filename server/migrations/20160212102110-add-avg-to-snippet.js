'use strict';

var models = require('../models');

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
    models.Snippet.findAll()
    .then(function(snippets) {
      snippets.map(function(snippet) {
        models.Rating.aggregate('value', 'avg', {where: {SnippetId: snippet.id}})
        .then(average => {
          snippet.avg = average;
          snippet.save();
        });
      });
    });
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('Snippets', 'avg');
  }
};
