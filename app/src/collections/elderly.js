var Elderly = require('../models/elderly');

module.exports =  Backbone.Collection.extend({

  model: Elderly,
  url: '/elderly',
});
