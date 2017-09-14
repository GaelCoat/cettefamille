
module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/elderly',

  defaults: {
    name: null,
    code: null,
    phone: null
  },


});
