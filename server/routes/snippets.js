var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET snippets listing. */
router.get('/', function (req, res) {
  models.Snippet.findAll().then(function (snippets) {
    var mappedSnippets = snippets.map(function (s) {
      return ({ id: s.id,
                content: s.content,
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
  var attributes = {
    content: req.body.content,
    description: req.body.description,
    language: 'javascript',
    name: req.body.name,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  var snippet = models.Snippet.build(attributes);
  snippet.save({validate: false, logging: true}).then(function () {
    res.status(201).send('ok');
  }).catch(function () {
    res.status(422).send('error');
  });
});

module.exports = router;
