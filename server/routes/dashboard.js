var express = require('express');
var router = express.Router();
var models = require('../models');

var authChecker = function(req, res, next) {
  if (!req.user) {
    return res.status(401).send({message: 'You need to sign in before taking this action!'});
  } else {
    return next();
  }
};

/* GET dashboard stats. */
router.get('/', authChecker, function(req, res) {
  // TODO: fix to get only this month data
  // load currentUser last 3 snippets
  req.user.getSnippets({ scope: ['withVersions', 'withAuthor'], limit: 3 }).then(function (snippets) {
    var mappedSnippets = snippets.map(function (s){
      return s.toJson();
    });
    // load this month snippets count
    req.user.countSnippets().then(function (count) {
      // load user snippets id to find comments
      req.user.getSnippets({ attributes: ['id'] }).then(function (snippetsId) {
        var mappedSnippetsId = snippetsId.map(function (s){
          return s.dataValues.id;
        });
        // load last 3 comments for currentUser snippets
        models.Comment.scope(['withSnippet', 'withUser']).findAll({ where: { SnippetId: { $in: mappedSnippetsId }, UserId: { $ne: req.user.id }}, limit: 3 }).then(function (comments) {
          var mappedComments = comments.map(function (c){
            return c.toJson();
          });
          res.status(200).send({ count: count, comments: mappedComments, snippets: mappedSnippets });
        });
      });
    });
  });
});

module.exports = router;
