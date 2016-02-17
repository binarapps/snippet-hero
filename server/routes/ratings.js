var express = require('express');
var router = express.Router();
var models = require('../models');
var appLogger = require('../lib/logger');

/* GET ratings listing. */
router.get('/', function (req, res) {
  models.Rating.findAll().then(function (ratings) {
    var mappedRatings = ratings.map(function (rating) {
      return rating.toJson();
    });

    res.send(mappedRatings);
  });
});

/* POST new rating */
router.post('/', function (req, res) {
  var userId = req.user.get('id');
  var snippetId = req.body.SnippetId;
  var attributes = {
    value: req.body.value,
    UserId: userId,
    SnippetId: snippetId
  };
  models.sequelize.transaction(function (t){
    return models.Rating.findOne({ where : { SnippetId: snippetId, UserId: userId }, transaction: t }).then( function (rating) {
      if (rating) {
        return rating.update(attributes, {transaction: t}).then( function () {
          return models.Rating.aggregate('value', 'avg', { where : { SnippetId : snippetId }, dataType: 'float', transaction: t }).then( function (avg) {
            return models.Snippet.findById(snippetId, {transaction: t}).then( function (s) {
              return s.update({avg: avg}, {transaction: t}).then( function () {
                return models.User.findById(s.UserId, {transaction: t}).then( function (user) {
                  return models.Snippet.aggregate('avg', 'avg', { where : { UserId : user.id }, dataType: 'float', transaction: t }).then(function (totalAvg){
                    return user.update({avg: totalAvg}, {transaction: t}).then(function () {
                      return new Promise(function (resolve) {
                        resolve({rating: rating.toJson(), avg: avg.toFixed(2)});
                      });
                    });
                  });
                });
              });
            });
          });
        });
      } else {
        return models.Rating.create(attributes, {transaction: t}).then( function (newRating) {
          return models.Rating.aggregate('value', 'avg', { where : { SnippetId : snippetId }, dataType: 'float', transaction: t }).then( function (avg) {
            return models.Snippet.findById(snippetId, {transaction: t}).then( function (s) {
              return s.update({avg: avg}, {transaction: t}).then( function () {
                return models.User.findById(s.UserId, {transaction: t}).then( function (user) {
                  return models.Snippet.aggregate('avg', 'avg', { where : { UserId : user.id }, dataType: 'float', transaction: t }).then( function (totalAvg) {
                    return user.update({avg: totalAvg}, {transaction: t}).then(function () {
                      return new Promise(function (resolve) {
                        resolve({rating: newRating.toJson(), avg: avg.toFixed(2)});
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }
    });
  }).then( function (data) {
    res.status(200).send(data);
  }).catch( function (err) {
    appLogger.debug(err.message);
    res.status(422).send(err.message);
  });
});

module.exports = router;
