
module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/family',

  defaults: {
    name: null,
    code: null,
    phone: null,
    mail: null
  },


});
