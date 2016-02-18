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

/* GET snippets listing. */
router.get('/', function (req, res) {
  var perPage = req.query.results;
  var page = req.query.offset;
  var mappedSnippets;

  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings'])
    .findAll({ limit: perPage, offset: page })
    .then(function (snippets) {
      mappedSnippets = snippets.map(function (s) {
        return s.toJson();
      });
      return models.Snippet.count();
    }).then(function (c) {
      res.status(200).send({ snippets: mappedSnippets, count: c });
    });
});

/* GET current user's paginated snippets */
router.get('/user', function (req, res) {
  var perPage = req.query.results;
  var page = req.query.offset;
  var userId = req.user.get('id');
  var mappedSnippets;

  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings'])
    .findAll({ where: { UserId: userId }, limit: perPage, offset: page })
    .then(function (snippets) {
      mappedSnippets = snippets.map(function (s){
        return s.toJson();
      });
      return models.Snippet.count({ where: { UserId: userId }});
    }).then(function (c) {
      res.status(200).send({ snippets: mappedSnippets, count: c });
    });
});

router.get('/search', function (req, res) {
  var options = {};
  if (req.query.name) {
    options.where = { name: req.query.name };
  }
  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings'])
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
  models.Snippet.scope('withVersions')
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
    UserId: userId
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
    name: body.name
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

/* GET snippets from this calendar month (sort by avg) */
router.get('/best', function (req, res) {
  var today = new Date(Date.now());
  var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings'])
    .findAll({ where: { createdAt: { $gte: firstDayOfMonth } }, order: [ ['avg', 'DESC'], ['createdAt', 'DESC'] ], limit: 5 })
    .then( function (snippets) {
      var mappedSnippets = snippets.map( function (s) {
        return s.toJson();
      });
      res.status(200).send({snippets: mappedSnippets});
    }).catch();
});

module.exports = router;
