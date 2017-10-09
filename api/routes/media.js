var express = require('express');
var passport = require('passport');
var q = require('q');
var router = express.Router();
var auth = require('../auth');

// Service
var Media = require('../services/picture');

router.route('/list').get(auth, function(req, res) {

  return q.fcall(function() {

    return Media.getList();
  })
  .then(function(list) {

    res.json({list: list});
  })
  .catch(function(err) {

    console.log(err);
  })
});


module.exports = router;
