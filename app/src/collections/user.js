var User = require('../models/user');

module.exports =  Backbone.Collection.extend({

  model: User,
  url: '/user',
});
