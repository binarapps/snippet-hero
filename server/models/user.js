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
    scopes: {
      withComments: function () {
        return {
          include: [sequelize.models.Comment],
          order: [['createdAt', 'DESC'], [sequelize.models.Comment, 'createdAt', 'ASC']]
        };
      },
      withRatings: function () {
        return {
          include: [sequelize.models.Rating],
          order: [['createdAt', 'DESC'], [sequelize.models.Rating, 'createdAt', 'ASC']]
        };
      },
      withSnippets: function () {
        return {
          include: {
            model: sequelize.models.Snippet,
            include: [sequelize.models.SnippetVersion, sequelize.models.Rating],
            order: [['createdAt', 'DESC']]
          },
          order: [['createdAt', 'DESC']]
        };
      }
    },
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
      },
      toJson: function(currentUserId) {
        var json = {
          id: this.get('id'),
          email: this.get('email'),
          name: this.get('name'),
          totalAvg: 0.0,
          commentsCount: 0,
          ratingsCount: 0,
          snippets: {}
        };
        var sum = 0.0;
        var index = 0;

        if (this.Snippets){
          var allSnippets = this.Snippets.map(function (snippet) {
            var s = snippet.toJson(currentUserId);
            sum += s.avg;
            index++;
            return s;
          });
          json.snippets = allSnippets;
        }
        json.totalAvg = ( index == 0 ? 0 : (sum/index) ).toFixed(2);

        if (this.Comments){
          json.commentsCount = this.Comments.length;
        }

        if (this.Ratings){
          json.ratingsCount = this.Ratings.length;
        }

        return json;
      }
    }
  });
  return User;
};
