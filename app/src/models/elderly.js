var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/elderly',

  defaults: {
    name: null,
    code: null,
    phone: null
  },

  getCreated: function(format) {

    return moment(this.get('created')).format(format);
  },

  getState: function() {

    var s = this.get('process').state;
    var state = 'En attente';
    switch(s) {
      case 'done':
        state = 'Traitée'
        break;
    }

    return state;
  }
});
