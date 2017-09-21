var Testimony = require('../models/testimony');

module.exports =  Backbone.Collection.extend({

  model: Testimony,
  url: '/testimony',
});
