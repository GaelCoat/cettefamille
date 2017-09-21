var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/testimony',

  defaults: {
    name: null,
    location: null,
    content: null
  },

  getCreated: function(format) {

    return moment(this.get('created')).locale("fr").format(format);
  },

});
