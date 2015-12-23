'use strict';

module.exports = function(sequelize, DataTypes) {
  var Snippet = sequelize.define('Snippet', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    language: DataTypes.ENUM(
      'text/plain',
      'text/x-coffeescript',
      'text/x-scss',
      'text/css',
      'text/x-markdown',
      'text/x-haml',
      'text/html',
      'text/x-less',
      'text/javascript',
      'application/json',
      'text/nginx',
      'text/x-ruby',
      'text/x-sql',
      'text/x-yaml'
    ),
    UserId: DataTypes.INTEGER
  }, {
    scopes: {
      withVersions: function () {
        return {
          include: [sequelize.models.SnippetVersion],
          order: [['createdAt', 'DESC'], [sequelize.models.SnippetVersion, 'createdAt', 'ASC']]
        };
      }
    },
    instanceMethods: {
      toJson: function () {
        var json = {
          id: this.get('id'),
          name: this.get('name'),
          description: this.get('description'),
          language: this.get('language'),
          content: '',
          versions: []
        };

        if (this.SnippetVersions) {
          json.content = this.SnippetVersions.length ? this.SnippetVersions[0].content : '';
          json.versions = this.SnippetVersions.map(function (v) {
            return v.toJson();
          });
        }

        return json;
      }
    },
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        this.hasMany(models.SnippetVersion);
        this.hasMany(models.Rating);
        this.hasMany(models.Comment);
      }
    }
  });
  return Snippet;
};
