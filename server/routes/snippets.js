var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET snippets listing. */
router.get('/', function (req, res) {
  models.Snippet.findAll().then(function (snippets) {
    var mappedSnippets = snippets.map(function (s) {
      return ({ id: s.id, name: s.name, email: s.email });
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
  res.send('ok');
});

module.exports = router;
