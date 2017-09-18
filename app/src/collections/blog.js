var Blog = require('../models/blog');

module.exports =  Backbone.Collection.extend({

  model: Blog,
  url: '/blog',
});
