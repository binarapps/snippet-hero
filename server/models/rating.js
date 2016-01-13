'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('Rating', {
    value: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    SnippetId: DataTypes.INTEGER
  }, {
    instanceMethods: {
      toJson: function () {
        return {
          value: this.get('value'),
          UserId: this.get('UserId'),
          SnippetId: this.get('SnippetId'),
          id: this.get('id'),
          createdAt: this.get('createdAt'),
          updatedAt: this.get('updatedAt')
        };
      }
    },
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        this.belongsTo(models.Snippet);
      }
    }
  });
  return Rating;
};
