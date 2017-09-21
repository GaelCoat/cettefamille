var express = require('express');
var _ = require('underscore');
var passport = require('passport');
var q = require('q');
var auth = require('../auth');
var router = express.Router();

// Service
var Message = require('../services/message');

router.route('/').post(function(req, res) {

  return q.fcall(function() {

    return Message.create(req.body);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/count').get(auth, function(req, res) {

  return q.fcall(function() {

    return Message.getCount();
  })
  .then(function(count) {

    res.json({count: count});
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/list').get(auth, function(req, res) {

  var page = req.query.page;

  return q.fcall(function() {

    return Message.getList(page);
  })
  .then(function(list) {

    res.json({list: list});
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/:id')
.put(function(req, res) {

  return q.fcall(function() {

    return Message.update(req.params.id, req.body);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
  })
})
.delete(function(req, res) {

  return q.fcall(function() {

    return Message.remove(req.params.id);
  })
  .then(function() {

    res.json({state: 'success'});
  })
  .catch(function(err) {

    console.log(err);
  })
});


module.exports = router;
