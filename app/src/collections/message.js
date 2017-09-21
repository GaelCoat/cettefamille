var Message = require('../models/message');

module.exports =  Backbone.Collection.extend({

  model: Message,
  url: '/message',
});
