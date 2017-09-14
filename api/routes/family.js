var express = require('express');
var passport = require('passport');
var q = require('q');
var router = express.Router();

// Service
var Family = require('../services/family');

router.route('/').post(function(req, res) {

  return q.fcall(function() {

    return Family.create(req.body);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
  })

});

router.route('/list').get(function(req, res) {



});

module.exports = router;
