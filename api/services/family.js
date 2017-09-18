var q = require('q');
var _ = require('underscore');

// Les models
var model = require('../models/family');

// Les services
var process = require('./process');
var core = new require('./core')();

var service = _.extend(core, {

  model: model,

  getCount: function() {

    var that = this;

    return q.fcall(function() {

      return that.model
                  .find()
                  .populate('process')
                  .exec()
    })
    .then(function(list) {

      var count = 0;

      list.forEach(function(item) {

        if (item.get('process').state === 'idling') count++
      });

      return count;
    });
  },

  changeState: function(id, state) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).exec();
    })
    .then(function(item) {

      return process.changeState(item.get('process'), state)
    })
    .then(function() {

      return that.model.findOne({_id: id}).populate('process').exec();
    });
  },

  getRequests: function(sorting, page) {

    var that = this;

    var size = 20;
    var start = (page - 1) * size;

    return q.fcall(function() {

      if (sorting === 'all') return false;
      return process.model.find({state: sorting}).exec();
    })
    .then(function(list) {

      var data = null;
      if (list) var ids = _.pluck(list, '_id'), data = {process: {$in: ids}}

      return that.model
                  .find(data)
                  .limit(size)
                  .skip(start)
                  .populate('process')
                  .sort('-created')
                  .exec()
    })
    .then(function(list) {

      return list;
    });
  },

});

module.exports = service;
