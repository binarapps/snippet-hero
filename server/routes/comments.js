var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET all snippet comments*/
router.get('/:snippetId/comments', function (req, res) {
  models.Comment.findAll().then(function (comments) {
    var mappedComments = comments.map(function (c) {
      return c.toJson();
    });
    res.send(mappedComments);
  });
});

/* POST new snippet comment*/
router.post('/:snippetId/comments', function (req, res) {
  var body = req.body;
  var attributes = {
    content: body.content,
    SnippetId: req.params.snippetId
  };
  models.sequelize.transaction(function (t) {
    return models.Comment.create(attributes, {transaction: t});
  }).then(function (data) {
    res.status(201).send(data);
  }).catch(function (err) {
    res.status(422).send(err.message);
  });
});

module.exports = router;
