'use strict';
module.exports = function(sequelize, DataTypes) {
  var LineComment = sequelize.define('LineComment', {
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    SnippetVersionId: DataTypes.INTEGER,
    line: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        this.belongsTo(models.Snippet);
      }
    }
  });
  return LineComment;
};
