'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // unfortunatelly to change pg enum we can't have column which is using that enum
    // that's why I am removing that column here 
    return queryInterface.removeColumn('Snippets', 'language').then(function () {
      return queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Snippets_language";').then(function () {
        return queryInterface.addColumn(
          'Snippets',
          'language',
          {
            type: Sequelize.ENUM,
            values: ['text/plain', 'text/x-coffeescript', 'text/x-scss', 'text/css', 'text/x-markdown', 'text/x-haml', 'text/html', 'text/x-less', 'text/javascript', 'application/json', 'text/nginx', 'text/x-ruby', 'text/x-sql', 'text/x-yaml']
          }
        );
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Snippets', 'language').then(function () {
      return queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Snippets_language";').then(function () {
        return queryInterface.addColumn(
          'Snippets',
          'language',
          {
            type: Sequelize.ENUM,
            values: ['ruby', 'javascript', 'coffeescript', 'html', 'haml', 'slim', 'css', 'scss']
          }
        );
      });
    });
  }
};
