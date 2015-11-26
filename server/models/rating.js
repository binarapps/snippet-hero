'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('Rating', {
    value: DataTypes.INTEGER,
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
  return Rating;
};
