var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET profile page (with user's ratings/comments/snippets) */
router.get('/:id', function (req, res) {
  var userId = req.params.id;

  models.User.scope(['withSnippets', 'withComments', 'withRatings']).findById(userId)
    .then(function (user) {
      res.status(200).send(user.toJson());
    }).catch(function (err){
      res.send({err: err});
    });
});

module.exports = router;
