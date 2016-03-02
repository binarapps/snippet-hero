var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET dashboard stats. */
router.get('/',  function(req, res) {
  var mappedSnippets, count, mappedSnippetsId, mappedComments, bestSnippets;
  // TODO: fix to get only this month data
  // load currentUser last 3 snippets
  if (req.user){
    req.user.getSnippets({ scope: ['withVersions', 'withAuthor'], limit: 3 })
      .then(function (snippets) {
        mappedSnippets = snippets.map(function (s){
          return s.toJson();
        });
        // load this month snippets count
        return req.user.countSnippets();
      }).then(function (c) {
        count = c;
        return req.user.getSnippets({ attributes: ['id'] });
      }).then(function (snippetsId) {
        // load user snippets id to find comments
        mappedSnippetsId = snippetsId.map(function (s){
          return s.dataValues.id;
        });
        // load last 3 comments for currentUser snippets
        return models.Comment.scope(['withSnippet', 'withUser'])
          .findAll({ where: { SnippetId: { $in: mappedSnippetsId }, UserId: { $ne: req.user.id }}, limit: 3 });
      }).then(function (comments) {
        mappedComments = comments.map(function (c){
          return c.toJson();
        });
      }).then(function () {
        return models.Snippet.scope(['fromCurrentMonth', 'withVersions', 'withAuthor', { method: ['withRatings', req.user.get('id')] }])
          .findAll({order: [ ['avg', 'DESC'], ['createdAt', 'DESC'] ], limit: 5 });
      }).then(function (bests) {
        bestSnippets = bests.map( function (s) {
          return s.toJson();
        });
        res.status(200).send({ count: count, comments: mappedComments, snippets: mappedSnippets, bestSnippets: bestSnippets });
      });
  } else {
    res.status(401).send('you cannot see dashboard if you are not logged in!');
  }
});

module.exports = router;
