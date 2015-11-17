"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    login: DataTypes.STRING
  });

  return User;
};
