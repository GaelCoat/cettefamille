var express = require('express');
var passport = require('passport');
var q = require('q');
var router = express.Router();
var auth = require('../auth');

// Service
var Elderly = require('../services/elderly');

router.route('/').post(function(req, res) {

  return q.fcall(function() {

    return Elderly.create(req.body);
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

    return Elderly.getCount();
  })
  .then(function(count) {

    res.json({count: count});
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/list').get(auth, function(req, res) {

  var sorting = req.query.sorting;
  var page = req.query.page;

  return q.fcall(function() {

    return Elderly.getRequests(sorting, page);
  })
  .then(function(list) {

    res.json({list: list});
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/:id')
.put(auth, function(req, res) {

  var state = req.body.process.state;

  return q.fcall(function() {

    return Elderly.changeState(req.params.id, state);
  })
  .then(function(model) {

    console.log(model.process);
    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
  })
})
.delete(auth, function(req, res) {

  return q.fcall(function() {

    return Elderly.remove(req.params.id);
  })
  .then(function() {

    res.json({state: 'success'});
  })
  .catch(function(err) {

    console.log(err);
  })
});

module.exports = router;
