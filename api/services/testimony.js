var q = require('q');
var _ = require('underscore');

// Les models
var model = require('../models/testimony');

// Les services
var core = new require('./core')();
var Picture = require('./picture');

var service = _.extend(core, {

  model: model,

  getCount: function() {

    var that = this;

    return q.fcall(function() {

      return that.model
                  .count()
                  .exec()
    })
  },

  getList: function(page, limit) {

    var that = this;
    var size = Number(limit) || 20;
    var start = (page - 1) * size;

    return q.fcall(function() {

      return that.model
                  .find()
                  .limit(size)
                  .skip(start)
                  .populate('picture')
                  .sort('-created')
                  .exec()
    })
  },

  getOne: function(id) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).populate('picture').exec()
    })
  },

  modify: function(id, data, deletion) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).exec();
    })
    .then(function(model) {

      if (model.get('picture') && deletion) return Picture.delete(model.get('picture'));
      return that;
    })
    .then(function() {

      return that.update(id, data);
    })
  },

  delete: function(id) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).exec();
    })
    .then(function(model) {

      if (model.get('picture')) return Picture.delete(model.get('picture'));
      return that;
    })
    .then(function() {

      return that.remove(id);
    })
  },

});

module.exports = service;
