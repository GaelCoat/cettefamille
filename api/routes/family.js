var express = require('express');
var passport = require('passport');
var q = require('q');
var auth = require('../auth');
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

router.route('/count').get(auth, function(req, res) {

  return q.fcall(function() {

    return Family.getCount();
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

    return Family.getRequests(sorting, page);
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

    return Family.changeState(req.params.id, state);
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

    return Family.remove(req.params.id);
  })
  .then(function() {

    res.json({state: 'success'});
  })
  .catch(function(err) {

    console.log(err);
  })
});

module.exports = router;
