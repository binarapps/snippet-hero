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
  var user_id = req.user.dataValues.id;
  models.Rating.findOne({ where : { SnippetId: req.body.SnippetId, UserId: user_id } }).then( function (rating) {
    if (rating) {
      const snippet_id = req.body.SnippetId;
      rating.value = req.body.value;
      
      rating.save({ validate: false, logging: true}).then(function () {
        models.Rating.sum('value', { where : { SnippetId: snippet_id } }).then( function (sum) {
          sum_ratings = sum;
          models.Rating.count({ where : { SnippetId: snippet_id } }).then(function (c){
            var average = 0;
            if (c > 0) {
              average = (sum_ratings/c);
            } 
          });
        });
        res.status(200).send({rating: rating, avg: average.toFixed(2)});
      }).catch(function () {
        res.status(422).send('error');
      });
    } else {
      var attributes = {
        SnippetId: req.body.SnippetId,
        value: req.body.value,
        UserId: user_id
      };
      var new_rating = models.Rating.build(attributes);
      new_rating.save({ validate: false, logging: true}).then(function (new_rating) {
        res.status(201).send({rating: new_rating, avg: new_rating.value});
      }).catch(function () {
        res.status(422).send('error');
      });
    }
  });
});

module.exports = router;
