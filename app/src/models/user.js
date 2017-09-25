var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/user',

  defaults: {
    username: null,
    mail: null
  },

  getCreated: function(format) {

    return moment(this.get('created')).format(format);
  },


});
