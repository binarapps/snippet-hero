var express = require('express');
var router = express.Router();
var models = require('../models');

var authChecker = function(req, res, next) {
  if (!req.user) {
    return res.status(401).send({message: 'You need to sign in before taking this action!'});
  } else {
    return next();
  }
};

/* GET all snippet comments*/
router.get('/:snippetId/comments', function (req, res) {
  models.Comment.scope(['withUser']).findAll({
    where: {
      SnippetId: req.params.snippetId
    },
    order: [['createdAt', 'DESC']]
  }).then(function (comments) {
    var mappedComments = comments.map(function (c) {
      return c.toJson();
    });
    res.send(mappedComments);
  });
});

/* POST new snippet comment*/
router.post('/:snippetId/comments', authChecker, function (req, res) {
  var body = req.body;
  var attributes = {
    content: body.content,
    SnippetId: req.params.snippetId,
    UserId: req.user.id
  };
  models.Comment.create(attributes).then(function (comment) {
    return models.Comment.scope(['withUser']).findById(comment.id);
  }).then(function (c) {
    res.status(201).send(c.toJson());
  }).catch(function (err) {
    res.status(422).send(err.message);
  });
});

module.exports = router;
