'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    SnippetId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        this.belongsTo(models.Snippet);
      }
    }
  });
  return Comment;
};
