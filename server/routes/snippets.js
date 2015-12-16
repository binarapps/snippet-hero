var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET snippets listing. */
router.get('/', function (req, res) {
  models.Snippet.findAll({
    include: [models.SnippetVersion],
    order: [[models.SnippetVersion, 'createdAt', 'ASC']]
  }).then(function (snippets) {
    var mappedSnippets = snippets.map(function (s) {
      return ({ id: s.id,
                content: s.SnippetVersions.length ? s.SnippetVersions[0].content : '',
                versions: s.SnippetVersions.map(function (v) {
                  return {content: v.content, createdAt: v.createdAt};
                }),
                name: s.name,
                description: s.description,
                language: s.language
      });
    });

    res.send(mappedSnippets);
  });
});

/* GET snippet by id */
router.get('/:id', function (req, res) {
  models.Snippet.findById(req.params.id).then(function (s) {
    res.send(s);
  });
});

/* POST new snippet  */
router.post('/', function (req, res) {
  var body = req.body;
  var attributes = {
    description: body.description,
    language: 'javascript',
    name: body.name
  };

  models.Snippet.create(attributes).then(function (snippet) {
    snippet.createSnippetVersion({
      content: body.content
    }).then(function () {
      res.status(201).send('ok');
    }).catch(function (err) {
      res.status(422).send(err.message);
    });
  }).catch(function (err) {
    res.status(422).send(err.message);
  });
});

module.exports = router;
