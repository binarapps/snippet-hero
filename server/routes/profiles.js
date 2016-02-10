var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET profile page. */
// router.get('/', function(req, res) {
//   res.status(200).send();
// });

/* GET profile page (with user's ratings/comments/snippets) */
  router.get('/:id', function (req, res) {
    var userId = req.params.id;
    var currentUserId = req.user.get('id');

    models.User.findById(userId)
      .then(function (user) {
        models.Comment.count({ where : {UserId: userId }})
        .then(function (commentCount){
          models.Rating.count({ where : {UserId: userId}})
          .then(function (ratingCount) {
            models.Snippet.scope(['withVersions', 'lastComments', 'withAuthor', 'withRatings']).findAll({ where: { UserId: userId }})
            .then(function (snippets) {
              var currentUserRating = 0;
              var mappedSnippets = snippets.map( function (s) {
                return s.toJson;
              });
            }).catch();
          }).catch();
        }).catch();
      }).catch();
  });

module.exports = router;
