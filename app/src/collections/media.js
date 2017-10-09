var Media = require('../models/media');

module.exports =  Backbone.Collection.extend({

  model: Media,
  url: '/medias',
});
