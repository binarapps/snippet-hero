'use strict';

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let user;
  if (req.user) {
    user = req.user.toJson();
  } else {
    user = null;
  }
  res.render('index', { title: 'Express', currentUser: user });
});

module.exports = router;
