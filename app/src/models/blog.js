var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/blog',

  defaults: {
    title: null,
    description: null,
    content: null
  },

  getCreated: function(format) {

    return moment(this.get('created')).locale("fr").format(format);
  },

});
