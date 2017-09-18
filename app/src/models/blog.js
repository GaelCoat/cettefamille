var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/blog',

  defaults: {
    title: null,
    content: null
  },

  getCreated: function(format) {

    return moment(this.get('created')).locale("fr").format(format);
  },

  getPreview: function() {

    return this.get('content').slice(0, 150) + '...';
  },

});
