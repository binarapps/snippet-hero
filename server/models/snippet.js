'use strict';
module.exports = function(sequelize, DataTypes) {
  var Snippet = sequelize.define('Snippet', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    language: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
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
