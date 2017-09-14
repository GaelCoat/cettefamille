var q = require('q');
var _ = require('underscore');

// Les models
var model = require('../models/family');

// Les services
var core = new require('./core')();

var service = _.extend(core, {

  model: model,
});

module.exports = service;
