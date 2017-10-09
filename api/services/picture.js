var q = require('q');
var _ = require('underscore');
var fs = require('fs');

// Les models
var model = require('../models/picture');

// Les services
var core = new require('./core')();
var S3 = require('./s3');

var service = _.extend(core, {

  model: model,

  upload: function(uri) {

    var that = this;

    var mime = uri.split(",")[0].split(":")[1].split(";")[0];;

    return q.fcall(function() {

      return that.create({type: mime});
    })
    .then(function(model) {

      return [
        model.get('_id'),
        S3.upload(uri, mime, model.get('_id'))
      ]
    })
    .all()
    .spread(function(id, data) {

      return that.update(id, {
        url: data.url,
        name: data.name
      });
    })
    .catch(function(err) {

      console.log(err);
    })
  },

  getList: function() {

    var that = this;

    return q.fcall(function() {

      return S3.list('images');
    })
  },

  delete: function(id) {

    var that = this;

    return q.fcall(function() {

      return that.remove(id);
    })
    .then(function() {

      return S3.delete('/images/'+id);
    })
  },

});

module.exports = service;
