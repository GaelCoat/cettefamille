var express = require('express');
var passport = require('passport');
var q = require('q');
var router = express.Router();

// Service
var Blog = require('../services/blog');
var Picture = require('../services/picture');

router.route('/new').post(function(req, res) {

  return q.fcall(function() {

    if (req.body.picture) return Picture.upload(req.body.picture);
    return false;
  })
  .then(function(model) {

    var data = {
      title: req.body.title,
      content: req.body.content,
      description: req.body.description
    }

    if (model) data.picture = model.get('_id');

    return Blog.create(data);
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

    return Blog.getCount();
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

  return q.fcall(function() {

    return Blog.getList(page);
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

    return Blog.getOne(req.params.id);
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

    if (req.body.picture) return Picture.upload(req.body.picture);
    return false;
  })
  .then(function(model) {

    var data = {
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
      picture: null
    }

    if (model) data.picture = model.get('_id');

    return Blog.update(req.params.id, data);
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

    return Blog.remove(req.params.id);
  })
  .then(function() {

    res.json({state: 'success'});
  })
  .catch(function(err) {

    console.log(err);
  })
});

module.exports = router;
