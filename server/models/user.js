'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    authToken: DataTypes.STRING,
    meerkatUserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Snippet);
        this.hasMany(models.Rating);
        this.hasMany(models.Comment);
        this.hasMany(models.LineComment);
      }
    }
  });
  return User;
};
