var moment = require('moment');

module.exports = Backbone.Model.extend({

  idAttribute: "_id",
  urlRoot: '/family',

  defaults: {
    name: null,
    code: null,
    phone: null,
    mail: null
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
