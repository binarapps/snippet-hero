'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Snippets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      language: {
        type: Sequelize.ENUM,
        values: ['ruby', 'javascript', 'coffeescript', 'html', 'haml', 'slim', 'css', 'scss']
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('Snippets').then(function () {
      return queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Snippets_language";');
    });
  }
};
