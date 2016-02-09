'use strict';

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    SnippetId: DataTypes.INTEGER
  }, {
    scopes: {
      withUser: function () {
        return {
          include: sequelize.models.User
        };
      },
      withSnippet: function () {
        return {
          include: sequelize.models.Snippet
        };
      }
    },
    instanceMethods: {
      toJson: function () {
        let json = {
          content: this.get('content'),
          id: this.get('id'),
          SnippetId: this.get('SnippetId'),
          createdAt: this.get('createdAt')
        };

        if (this.User) {
          json.User = { name: this.User.toJson().name };
        }

        if (this.Snippet) {
          json.Snippet = { name: this.Snippet.toJson().name };
        }

        return json;
      }
    },
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        this.belongsTo(models.Snippet);
      }
    }
  });
  return Comment;
};
