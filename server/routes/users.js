var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

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

module.exports = router;
