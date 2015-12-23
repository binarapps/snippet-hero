var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET ratings listing. */
router.get('/', function (req, res) {
  models.Rating.findAll().then(function (ratings) {
    var mappedRatings = ratings.map(function (rating) {
      return ({ value: rating.value,
                userdId: rating.UserId,
                snippetId: rating.SnippetId
      });
    });

    res.send(mappedRatings);
  });
});

/* GET rating by id */
router.get('/:id', function (req, res) {
  models.Rating.findById(req.params.id).then( function (rating) {
    res.send(rating);
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
  var attributes = {
    SnippetId: req.body.SnippetId,
    value: req.body.value,
    UserId: req.body.UserId
  };

  var rating = models.Rating.build(attributes);
  rating.save({ validate: false, logging: true}).then(function (rating) {
    res.status(201).send(rating.toJson());
  }).catch(function () {
    res.status(422).send('error');
  });
});

module.exports = router;
