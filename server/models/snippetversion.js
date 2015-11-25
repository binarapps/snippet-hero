'use strict';
module.exports = function(sequelize, DataTypes) {
  var SnippetVersion = sequelize.define('SnippetVersion', {
    content: DataTypes.TEXT,
    SnippetId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Snippet);
        this.hasMany(models.LineComment);
      }
    }
  });
  return SnippetVersion;
};
