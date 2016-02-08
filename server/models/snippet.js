'use strict';

module.exports = function(sequelize, DataTypes) {
  var Snippet = sequelize.define('Snippet', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    language: DataTypes.ENUM(
      'text/plain',
      'text/x-coffeescript',
      'text/x-scss',
      'text/css',
      'text/x-markdown',
      'text/x-haml',
      'text/html',
      'text/x-less',
      'text/javascript',
      'application/json',
      'text/nginx',
      'text/x-ruby',
      'text/x-sql',
      'text/x-yaml'
    ),
    UserId: DataTypes.INTEGER
  }, {
    scopes: {
      withComments: function () {
        return {
          include: {
            model: sequelize.models.Comment,
            include: [sequelize.models.User],
            order: [['createdAt', 'DESC']]
          },
          order: [['createdAt', 'DESC']]
        };
      },
      lastComments: function () {
        return {
          include: {
            model: sequelize.models.Comment,
            include: [sequelize.models.User],
            limit: 5,
            order: [['createdAt', 'DESC']]
          },
          order: [['createdAt', 'DESC']]
        };
      },
      withVersions: function () {
        return {
          include: [sequelize.models.SnippetVersion],
          order: [['createdAt', 'DESC'], [sequelize.models.SnippetVersion, 'createdAt', 'ASC']]
        };
      },
      withAuthor: function () {
        return {
          include: [sequelize.models.User]
        };
      },
      withRatings: function () {
        return {
          include: [sequelize.models.Rating],
          order: [['createdAt', 'DESC'], [sequelize.models.Rating, 'createdAt', 'ASC']]
        };
      }
    },
    instanceMethods: {
      toJson: function () {
        var json = {
          id: this.get('id'),
          name: this.get('name'),
          description: this.get('description'),
          language: this.get('language'),
          content: '',
          versions: [],
          ratings: [],
          comments: [],
          avg: 0,
          createdAt: this.get('createdAt')
        };

        if(this.User) {
          json.user = this.User.toJson();
        }
        if (this.SnippetVersions) {
          json.content = this.SnippetVersions.length ? this.SnippetVersions[0].content : '';
          json.versions = this.SnippetVersions.map(function (v) {
            return v.toJson();
          });
        }

        if (this.Comments) {
          json.comments = this.Comments.map(function (c) {
            return c.toJson();
          });
        }

        if (this.Ratings) {
          json.ratings = this.Ratings.map(function (r) {
            return r.toJson();
          });

          var sum = 0;
          var index = 0;

          this.Ratings.forEach(function (r){
            sum += r.value;
            index++;
          });

          json.avg = (sum==0 ? 0 : sum/index).toFixed(2);
        }

        return json;
      }
    },
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        this.hasMany(models.SnippetVersion, {onDelete: 'cascade', hooks: true});
        this.hasMany(models.Rating, {onDelete: 'cascade', hooks: true});
        this.hasMany(models.Comment, {onDelete: 'cascade', hooks: true});
      }
    }
  });
  return Snippet;
};
