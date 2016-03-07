var express = require('express');
var router = express.Router();
var models = require('../models');
var appLogger = require('../lib/logger');

var authChecker = function(req, res, next) {
  if (!req.user) {
    return res.status(401).send({message: 'You need to sign in before taking this action!'});
  } else {
    return next();
  }
};

/* GET snippets from specified month */
router.get('/', function (req, res) {
  /* January is 0, December is 11 */
  var options = { where: {}, order: [] };
  var month = parseInt(req.query.month);
  var year = parseInt(req.query.year);
  var first = new Date(Date.UTC(year, month, 1, 0, 0, 0));
  var last = new Date(Date.UTC(year, month+1, 0, 23, 59, 59, 999));
  options.where = { createdAt: { $gte: first, $lte: last } };
  options.order = [ ['avg', 'DESC'], ['createdAt', 'DESC'] ];
  var mappedSnippets;
  var scopes = req.user ? ['withVersions', 'lastComments', 'withAuthor', { method: ['withRatings', req.user.get('id')] }] : ['withVersions', 'lastComments', 'withAuthor', 'publicSnippets'];

  models.Snippet.scope(scopes)
    .findAll(options).then(function (snippets) {
      mappedSnippets = snippets.map(function (s) {
        return s.toJson();
      });
      res.status(200).send({snippets: mappedSnippets});
    });
});

router.get('/search', function (req, res) {
  var options = {};
  if (req.query.name) {
    options.where = { name: req.query.name };
  }
  var scopes = req.user ? ['withVersions', 'lastComments', 'withAuthor', { method: ['withRatings', req.user.get('id')] }] : ['withVersions', 'lastComments', 'withAuthor', 'publicSnippets'];

  models.Snippet.scope(scopes)
    .findAll(options)
    .then(function (snippets) {
      var mappedSnippets = snippets.map(function (s) {
        return s.toJson();
      });
      res.send(mappedSnippets);
    });
});

/* GET snippet by id */
router.get('/:id', function (req, res) {
  var scopes = req.user ? ['withVersions', 'lastComments', 'withAuthor', { method: ['withRatings', req.user.get('id')] }] : ['withVersions', 'lastComments', 'withAuthor', 'publicSnippets'];

  models.Snippet.scope(scopes)
    .findById(req.params.id)
    .then(function (s) {
      res.send(s.toJson());
    });
});

/* POST new snippet  */
router.post('/', function (req, res) {
  var userId = req.user.get('id');
  var body = req.body;
  var attributes = {
    description: body.description,
    language: body.language,
    name: body.name,
    UserId: userId,
    isPublic: body.isPublic
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
    appLogger.debug(err.message);
    res.status(422).send(err.message);
  });
});

/* PUT snippet  */
router.put('/:id', authChecker, function (req, res) {
  var body = req.body;
  var attributes = {
    description: body.description,
    language: body.language,
    name: body.name,
    isPublic: body.isPublic
  };
  models.Snippet.scope(['withAuthor']).findById(req.params.id).then(function (snippet) {
    if (!(snippet.UserId === req.user.id)) {
      return res.status(422).send({status: 'error', message: 'You can not update someone else snippet!'});
    } else if (!snippet) {
      return res.status(422).send({status: 'error', message: 'There is no snippet with given id!'});
    }
    models.sequelize.transaction(function (t) {
      return snippet.update(attributes, {transaction: t}).then(function () {
        return snippet.createSnippetVersion({content: body.content}, {transaction: t}).then(function (v){
          return new Promise(function (resolve) {
            snippet.SnippetVersions = [v];
            resolve(snippet.toJson());
          });
        });
      });
    }).then(function (data) {
      res.status(200).send(data);
    }).catch(function (err) {
      appLogger.debug(err.message);
      res.status(422).send(err.message);
    });
  });
});

/* DELETE snippet and it's ratings/versions/comments */
router.delete('/:id', function (req, res){
  var snippetId = req.params.id;
  models.Snippet
    .findById(snippetId)
    .then(function (snippet) {
      return snippet.destroy();
    }).then(function () {
      res.status(200).send({snippet: snippetId});
    }).catch(function (err) {
      appLogger.debug(err.message);
      res.status(422).send(err);
    });
});

module.exports = router;
