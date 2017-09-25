var express = require('express');
var passport = require('passport');
var q = require('q');
var router = express.Router();
var auth = require('../auth');

// Service
var User = require('../services/user');

router.route('/').post(auth, function(req, res) {

  return q.fcall(function() {

    return User.new(req.body);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
    res.status(500).send(err);
  })

});


router.route('/list').get(auth, function(req, res) {

  var page = req.query.page;

  return q.fcall(function() {

    return User.getList(page);
  })
  .then(function(list) {

    res.json({list: list});
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/:id')
.get(function(req, res) {

  return q.fcall(function() {

    return User.getOne(req.params.id);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
  })
})
.put(auth, function(req, res) {

  return q.fcall(function() {

    return User.modify(req.params.id, req.body);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    res.status(500).send(err);
  })
})
.delete(auth, function(req, res) {

  return q.fcall(function() {

    return User.remove(req.params.id);
  })
  .then(function() {

    res.json({state: 'success'});
  })
  .catch(function(err) {

    console.log(err);
  })
});

module.exports = router;
