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

  getContent: function(cut) {

    var length = 350;
    var txt = this.get('content');

    if (cut) length = 150;
    if (this.get('content').length > length) txt = txt.slice(0, length) + '...';

    return txt.replace(/\n/gi, '<br>');
  },

});
