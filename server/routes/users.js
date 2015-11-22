var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET users listing. */
router.get('/', function(req, res) {
    models.User.findAll().then(function(user) {
        res.send(user);
    });

});

module.exports = router;
