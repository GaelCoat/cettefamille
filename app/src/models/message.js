var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/message',

  defaults: {
    name: null,
    message: null,
    phone: null
  },

  getCreated: function(format) {

    return moment(this.get('created')).locale("fr").format(format);
  },

});
