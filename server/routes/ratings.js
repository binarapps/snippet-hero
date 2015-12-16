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
router.get('/:id', function (res, req) {
  models.Rating.findById(req.params.id).then( function (rating) {
    res.send(rating);
  });
});

/* POST new rating */
router.post('/', function (res, req) {
  var attributes = {
    value: req.body.value,
    SnippetId: req.body.SnippetId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  var rating = models.Rating.build(attributes);
  rating.save({ validate: false, logging: true}).then(function () {
    res.status(201).send('ok');
  }).catch(function () {
    res.status(422).send('error');
  });
});

module.exports = router;