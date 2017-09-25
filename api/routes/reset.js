var express = require('express');
var q = require('q');
var passport = require('passport');
var router = express.Router();

// Service
var Reset = require('../services/reset');
var User = require('../services/user');

router.route('/').get(function(req, res) {

  res.render('reset');
})
.post(function(req, res) {

  return q.fcall(function() {

    return Reset.check(req.body);
  })
  .then(function(response) {

    res.render('reset-success', {mail: req.body.mail});
  })
  .catch(function(err) {

    console.log(err);
    res.render('reset');
  })
});

router.route('/define').get(function(req, res) {

  res.render('define', {uid: req.query.uid, rid: req.query.rid});
})
.post(function(req, res) {

  return q.fcall(function() {

    return Reset.define(req.query.uid, req.query.rid, req.body);
  })
  .then(function(response) {

    res.redirect('/login');
  })
  .catch(function(err) {

    console.log(err);
  })
})

module.exports = router;

