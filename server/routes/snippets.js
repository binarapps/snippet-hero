var express = require('express');
var router = express.Router();
var models = require('../models');
var slack = require('../services/slack-integration');
var appLogger = require('../lib/logger');

/* GET with pagination */
router.get('/', function (req, res) {
  var perPage = req.query.results;
  var page = req.query.offset;
  var userId = req.query.userId ? req.query.userId : null;
  var options = { limit : perPage, offset : page };
  var countOptions = null;
  if(userId) {
    options['where'] = { UserId : userId };
    countOptions = { where : { UserId : userId }};
  }

  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings']).findAll(options).then(function (snippets) {
    var mappedSnippets = snippets.map(function (s){
      return s.toJson();
    });
    models.Snippet.count(countOptions).then(function (c) {
      res.status(200).send({snippets: mappedSnippets, count: c, userId: userId});
    });
  });
});

/* GET current user's paginated snippets */
router.get('/user', function (req, res) {
  var perPage = req.query.results;
  var page = req.query.offset;
  var userId = req.user.get('id');

  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings']).findAll({ where: { UserId: userId }, limit: perPage, offset: page }).then(function (snippets) {
    var mappedSnippets = snippets.map(function (s){
      return s.toJson();
    });
    models.Snippet.count({ where : {UserId: userId }}).then(function (c) {
      res.status(200).send({snippets: mappedSnippets, count: c});
    });
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
    slack.notify('New snippet was added! ' + slack.link('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'See it!'));
    res.status(201).send(data);
  }).catch(function (err) {
    appLogger.debug(err.message);
    res.status(422).send(err.message);
  });
});


/* DELETE snippet and it's ratings/versions/comments */
router.delete('/:id', function (req, res){
  var snippetId = req.params.id;
  models.Snippet.findById(snippetId).then(function (snippet) {
    snippet.destroy().then(function () {
      res.status(200).send({snippet: snippetId});
    }).catch( function (err) {
      appLogger.debug(err.message);
      res.status(422).send(err);
    });
  }).catch(function (err) {
    appLogger.debug(err.message);
    res.status(422).send(err);
  });
});

module.exports = router;
