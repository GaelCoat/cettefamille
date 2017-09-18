var Family = require('../models/family');

module.exports =  Backbone.Collection.extend({

  model: Family,
  url: '/family',
});
