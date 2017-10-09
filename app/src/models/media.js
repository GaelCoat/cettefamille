var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/media',

  defaults: {
    url: null,
    type: null
  },


});
