var express = require('express');
var router = express.Router();
var models = require('../models');
var slack = require('../services/slack-integration');

/* GET snippets listing. */
router.get('/', function (req, res) {
  models.Snippet.scope(['withVersions', 'withComments']).findAll().then(function (snippets) {
    var mappedSnippets = snippets.map(function (s) {
      return s.toJson();
    });
    res.send(mappedSnippets);
  });
});

router.get('/search', function (req, res) {
  var options = {};
  if (req.query.name) {
    options.where = { name: req.query.name };
  }
  models.Snippet.scope('withVersions').findAll(options).then(function (snippets) {
    var mappedSnippets = snippets.map(function (s) {
      return s.toJson();
    });

    res.send(mappedSnippets);
  });
});

/* GET snippet by id */
router.get('/:id', function (req, res) {
  models.Snippet.findById(req.params.id, {include: [models.SnippetVersion]}).then(function (s) {
    res.send(s.toJson());
  });
});

/* POST new snippet  */
router.post('/', function (req, res) {
  var body = req.body;
  var attributes = {
    description: body.description,
    language: body.language,
    name: body.name
  };
  models.sequelize.transaction(function (t) {
    return models.Snippet.create(attributes, {transaction: t}).then(function (snippet) {
      return snippet.createSnippetVersion({content: body.content}, {transaction: t}).then(function (v){
        return new Promise(function (resolve) {
          snippet.SnippetVersions = [v];
          resolve(snippet.toJson());
        });
      });
    });
  }).then(function (data) {
    slack.notify('New snippet was added! ' + slack.link('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'See it!'));
    res.status(201).send(data);
  }).catch(function (err) {
    res.status(422).send(err.message);
  });
});

module.exports = router;
