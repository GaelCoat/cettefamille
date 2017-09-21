var q = require('q');
var _ = require('underscore');

// Les models
var model = require('../models/message');

// Les services
var core = new require('./core')();

var service = _.extend(core, {

  model: model,

  getCount: function() {

    var that = this;

    return q.fcall(function() {

      return that.model
                  .count({seen: false})
                  .exec()
    })
  },

  getList: function(page) {

    var that = this;
    var size = 20;
    var start = (page - 1) * size;

    return q.fcall(function() {

      return that.model
                  .find()
                  .limit(size)
                  .skip(start)
                  .sort('-created')
                  .exec()
    })
  },

});

module.exports = service;
