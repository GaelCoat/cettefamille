var express = require('express');
var passport = require('passport');
var router = express.Router();


router.route('/').get(function(req, res) {

  res.render('handler');
});

router.route('/:id').get(function(req, res) {

  res.render('handler');
});

module.exports = router;
