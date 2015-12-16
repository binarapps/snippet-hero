var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET users listing. */
router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    var mappedUsers = users.map(function(user) {
      return ({ id: user.id, name: user.name, email: user.email });
    });

    res.send(mappedUsers);
  });
});

router.get('/:id', function(req, res) {
  models.User.findById(req.params.id).then(function(user) {
    res.send(user);
  });
});

router.get('/:id/snippets', function(req, res) {
  models.Snippet.findAll({ where: { UserId: req.params.id } }).then(function(snippets) {
    var snippet_ids = snippets.map(function(snippet) {
      return snippet.id;
    });

    res.send({ snippet_ids: snippet_ids });
  });
});

/* GET user's ratings */
router.get('/:id/ratings', function (req, res) {
  models.Rating.findAll({ where: { UserId: req.params.id } }).then(function (ratings) {
    var mappedRatings = ratings.map(function (rating) {
      return ({ value: rating.value,
                Id: rating.id,
                UserId: rating.UserId
      });
    });

    res.send(mappedRatings);
  });
});

module.exports = router;
