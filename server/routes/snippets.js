var express = require('express');
var router = express.Router();
var models = require('../models');
var slack = require('../services/slack-integration');
var appLogger = require('../lib/logger');

/* GET with pagination */
router.get('/', function (req, res) {
  var perPage = req.query.results;
  var page = req.query.offset;

  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings']).findAll({ limit: perPage, offset: page }).then(function (snippets) {
    var mappedSnippets = snippets.map(function (s){
      return s.toJson();
    });
    models.Snippet.count().then(function (c) {
      res.status(200).send({snippets: mappedSnippets, count: c});
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

/* GET snippet's ratings */
router.get('/:id/ratings', function (req, res) {
  models.Rating.findAll({ where : { SnippetId: req.params.id } }).then(function (ratings) {
    var mappedRatings = ratings.map(function (rating) {
      return rating.toJson();
    });
    
    res.send(mappedRatings);
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

/* GET snippet's rating from user*/
router.get('/:snippet_id/users/:user_id', function (req, res) {
  models.Rating.findAll({ where: { UserId: req.params.user_id, SnippetId: req.params.snippet_id } }).then(function (ratings){
    var mappedRatings = ratings.map(function (rating) {
      return rating.toJson();
    });

    res.send(mappedRatings);
  });
});

/* GET current user's rating for snippet */
router.get('/:snippet_id/user', function (req, res) {
  var snippetId = req.params.snippet_id;
  if(req.user){
    var userId = req.user.get('id');
    models.Rating.findOne({ where : { SnippetId: snippetId , UserId: userId } }).then( function (rating) {
      var grade = 0;
      if (rating) {
        grade = rating.value;
      } 
      var hash = {user: userId, rate: grade, snippet: snippetId};
      res.status(201).send(hash);
    });
  } else {
    res.status(422).send({user: null, rate: 0, snippet: snippetId});
  }
});

/* GET snippet's average rating */
router.get('/:id/avg', function (req, res){
  var snippetId = req.params.id;
  var sumRtings = 0.0;
  models.Rating.sum('value', { where : { SnippetId: snippetId } }).then(function (sum){
    sumRtings = sum;
    models.Rating.count({ where : { SnippetId: snippetId } }).then(function (c){
      var average = 0;
      if(c > 0) {
        average = (sumRtings/c);
      }
      res.status(200).send({avg: average.toFixed(2), snippetId: snippetId});
    });
  });
});

/* DELETE snippet and it's ratings/versions/comments */
router.delete('/:id', function (req, res){
  var snippetId = req.params.id;
  models.Snippet.findById(snippetId).then(function (snippet){
    snippet.destroy().then(function () {
      res.status(200).send({snippet: snippetId});
    }).catch( function (err) {
      res.status(422).send(err);
    });
  }).catch(function (err) {
    res.status(422).send(err);
  });
});

module.exports = router;
