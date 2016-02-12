var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET ratings listing. */
router.get('/', function (req, res) {
  models.Rating.findAll().then(function (ratings) {
    var mappedRatings = ratings.map(function (rating) {
      return rating.toJson();
    });

    res.send(mappedRatings);
  });
});

/* GET rating by id */
router.get('/:id', function (req, res) {
  models.Rating.findById(req.params.id).then( function (rating) {
    res.send(rating.toJson());
  });
});

/* POST new rating */
router.post('/', function (req, res) {
  var userId = req.user.get('id');
  var snippetId = req.body.SnippetId;
  models.Rating.findOne({ where : { SnippetId: snippetId, UserId: userId } }).then( function (rating) {
    if (rating) {
      rating.value = req.body.value;
      rating.save({ validate: false, logging: true}).then(function () {
        models.Rating.aggregate('value', 'avg', { where : { SnippetId : snippetId }, dataType: 'float' }).then( function (avg) {
          models.Snippet.findById(snippetId).then(function (s) {
            s.avg = avg.toFixed(2);
            s.save({ validate: false, logging: true}).then(function(){
              models.User.findById(s.UserId).then(function (user){
                models.Snippet.aggregate('avg', 'avg', { where : { UserId : user.id }, dataType: 'float' }).then(function (totalAvg){
                  user.avg = totalAvg;
                  user.save({ validate: false, logging: true});
                });
              });
            });
          });
          res.status(200).send({rating: rating, avg: avg.toFixed(2)});
        });
      }).catch(function () {
        res.status(422).send('error');
      });
    } else {
      var attributes = {
        SnippetId: snippetId,
        value: req.body.value,
        UserId: userId
      };
      var new_rating = models.Rating.build(attributes);
      new_rating.save({ validate: false, logging: true}).then(function (new_rating) {
        models.Rating.aggregate('value', 'avg', { where : { SnippetId : snippetId }, dataType: 'float' }).then( function (avg) {
          models.Snippet.findById(snippetId).then(function (s) {
            s.avg = avg.toFixed(2);
            s.save({ validate: false, logging: true}).then(function(){
              models.User.findById(s.UserId).then(function (user){
                models.Snippet.aggregate('avg', 'avg', { where : { UserId : user.id }, dataType: 'float' }).then(function (totalAvg){
                  user.avg = totalAvg;
                  user.save({ validate: false, logging: true});
                });
              });
            });
          });
          res.status(200).send({rating: new_rating, avg: avg.toFixed(2)});
        });
      }).catch(function () {
        res.status(422).send('error');
      });
    }
  });
});

module.exports = router;
