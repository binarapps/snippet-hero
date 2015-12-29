var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    var mappedUsers = users.map(function(user) {
      return ({ id: user.id, name: user.name, email: user.email });
    });

    res.send(mappedUsers);
  });
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.send({ user: req.user });
  }
);

router.delete('/logout', function(req, res) {
  req.logout();
  res.send(true);
});

router.post('/register', function(req, res) {
  var body = req.body;
  var salt = bcrypt.genSaltSync();
  var attributes = {
    email: body.email,
    name: body.name,
    encryptedPassword: bcrypt.hashSync(body.password, salt),
    passwordSalt: salt
  };
  User.create(attributes).then(function(user) {
    res.status(201).send({ user: user });
  }).catch(function(err) {
    res.status(422).send(err.message);
  });
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id).then(function(user) {
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
