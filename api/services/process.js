var q = require('q');
var _ = require('underscore');

// Les models
var model = require('../models/process');

// Les services
var core = new require('./core')();

var service = _.extend(core, {

  model: model,

  changeState: function(id, state) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOneAndUpdate({_id: id}, {state: state}, {new: true}).exec();
    })
    .then(function(item) {

      return item;
    });
  },



});

module.exports = service;
