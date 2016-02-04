var express = require('express');
var router = express.Router();
var models = require('../models');
var slack = require('../services/slack-integration');
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
  models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings']).findAll(options).then(function (snippets) {
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
router.post('/', authChecker, function (req, res) {
  var userId = req.user.id;
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
    // TODO: replace with correct link
    slack.notify('New snippet was added! ' + slack.link('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'See it!'));
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
  if (req.user) {
    var userId = req.user.dataValues.id;
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
router.get('/:id/avg', function (req, res) {
  var snippet_id = req.params.id;
  var sum_ratings = 0.0;
  models.Rating.sum('value', { where : { SnippetId: snippet_id } }).then(function (sum){
    sum_ratings = sum;
    models.Rating.count({ where : { SnippetId: snippet_id } }).then(function (c){
      var average = 0;
      if(c > 0) {
        average = (sum_ratings/c);
      }
      res.status(200).send({avg: average.toFixed(2), snippetId: snippet_id});
    });
  });
});

/* DELETE snippet and it's ratings/versions/comments */
router.delete('/:id', authChecker, function (req, res) {
  models.Snippet.scope(['withAuthor']).findById(req.params.id).then(function (snippet) {
    if (!(snippet.UserId === req.user.id)) {
      return res.status(422).send({status: 'error', message: 'You can not delete someone else snippet!'});
    } else if (!snippet) {
      return res.status(404).send({status: 'error', message: 'There is no snippet with given id!'});
    }

    snippet.destroy().then(function () {
      res.status(204).send();
    }).catch( function (err) {
      res.status(422).send(err);
    });
  }).catch(function (err) {
    res.status(422).send(err);
  });
});

module.exports = router;
