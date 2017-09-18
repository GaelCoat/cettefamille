var express = require('express');
var passport = require('passport');
var auth = require('../auth');
var router = express.Router();


router.route('/*').get(auth, function(req, res) {

  res.render('handler');
});


module.exports = router;
