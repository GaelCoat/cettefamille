var express = require('express');
var passport = require('passport');
var q = require('q');
var _ = require('underscore');
var router = express.Router();

// Service
var Testimony = require('../services/testimony');
var Picture = require('../services/picture');

router.route('/new').post(function(req, res) {

  return q.fcall(function() {

    if (req.body.picture) return Picture.upload(req.body.picture);
    return false;
  })
  .then(function(model) {

    var data = {
      name: req.body.name,
      content: req.body.content,
      location: req.body.location
    }

    if (model) data.picture = model.get('_id');

    return Testimony.create(data);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/count').get(function(req, res) {

  return q.fcall(function() {

    return Testimony.getCount();
  })
  .then(function(count) {

    res.json({count: count});
  })
  .catch(function(err) {

    console.log(err);
  })
});

router.route('/list').get(function(req, res) {

  var page = req.query.page;
  var limit = req.query.limit || null;

  return q.fcall(function() {

    return Testimony.getList(page, limit);
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

    return Testimony.getOne(req.params.id);
  })
  .then(function(model) {

    res.json(model);
  })
  .catch(function(err) {

    console.log(err);
  })
})
.put(function(req, res) {

  return q.fcall(function() {

    var picture = req.body.picture

    if (picture && _.isString(picture)) return Picture.upload(req.body.picture);
    return picture;
  })
  .then(function(model) {

    var data = {
      name: req.body.name,
      content: req.body.content,
      location: req.body.location
    }

    var deletion = false;

    if (model && _.isObject(model)) data.picture = model.get('_id'), deletion = true;
    else if (!model) data.picture = null, deletion = true;

    return Testimony.modify(req.params.id, data, deletion);
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

    return Testimony.delete(req.params.id);
  })
  .then(function() {

    res.json({state: 'success'});
  })
  .catch(function(err) {

    console.log(err);
  })
});

module.exports = router;
