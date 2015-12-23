var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET snippets listing. */
router.get('/', function (req, res) {
  models.Snippet.scope('withVersions').findAll().then(function (snippets) {
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

/* GET snippet's ratings */
router.get('/:id/ratings', function (req, res) {
  models.Rating.findAll({ where : { SnippetId: req.params.id } }).then(function (ratings) {
    var mappedRatings = ratings.map(function (rating) {
      return ({ value: rating.value,
                Id: rating.id,
                UserId: rating.UserId
      });
    });
    
    res.send(mappedRatings);
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
    res.status(201).send(data);
  }).catch(function (err) {
    res.status(422).send(err.message);
  });
});

/* GET snippet's rating from user*/
router.get('/:snippet_id/users/:user_id', function (req, res) {
  models.Rating.findAll({ where: { UserId: req.params.user_id, SnippetId: req.params.snippet_id } }).then(function (ratings){
    var mappedRatings = ratings.map(function (rating) {
      return ({ value: rating.value,
                userdId: rating.UserId,
                snippetId: rating.SnippetId
      });
    });

    res.send(mappedRatings);
  });
});

module.exports = router;
