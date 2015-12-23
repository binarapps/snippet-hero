var bcrypt = require('bcrypt-nodejs');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    authToken: DataTypes.STRING,
    meerkatUserId: DataTypes.INTEGER,
    encryptedPassword: DataTypes.STRING,
    passwordSalt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Snippet);
        this.hasMany(models.Rating);
        this.hasMany(models.Comment);
        this.hasMany(models.LineComment);
      }
    },
    instanceMethods: {
      isPasswordValid: function(password, callback) {
        bcrypt.compare(password, this.encryptedPassword, function(err, res) {
          callback(res);
        });
      }
    }
  });
  return User;
};
