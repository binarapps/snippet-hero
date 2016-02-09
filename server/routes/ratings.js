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

/* UPDATE user's rating for snippet*/
router.put('/:id', function (req, res) {
  models.Rating.findById(req.params.id).then( function (rating) {
    rating.value = req.body.value;
    rating.save({ validate: false, logging: true}).then(function () {
      res.status(200).send('ok');
    }).catch(function () {
      res.status(422).send('error');
    });
  }).catch(function () {
    res.status(422).send('error');
  });
});

/* POST new rating */
router.post('/', function (req, res) {
  var userId = req.user.get('id');
  var snippetId = req.body.SnippetId;
  var sumRatings = 0.0;
  models.Rating.findOne({ where : { SnippetId: snippetId, UserId: userId } }).then( function (rating) {
    if (rating) {
      rating.value = req.body.value;
      rating.save({ validate: false, logging: true}).then(function () {
        models.Rating.sum('value', { where : { SnippetId: snippetId } }).then( function (sum) {
          sumRatings = sum;
          models.Rating.count({ where : { SnippetId: snippetId } }).then( function (c){
            var average = 0;
            if(c>0){
              average = (sumRatings/c);
            }
            res.status(200).send({rating: rating, avg: average.toFixed(2)});
          });
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
        models.Rating.sum('value', { where : { SnippetId: snippetId } }).then( function (sum) {
          sumRatings = sum;
          models.Rating.count({ where : { SnippetId: snippetId } }).then( function (c){
            var average = 0;
            if(c>0){
              average = (sumRatings/c);
            }
            res.status(200).send({rating: new_rating, avg: average.toFixed(2)});
          });
        });
      }).catch(function () {
        res.status(422).send('error');
      });
    }
  });
});

module.exports = router;
