var tpl = require("pug-loader!./tpl.pug");

module.exports = Marionette.View.extend({

  initialize: function(params) {

  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());
      return that;
    })

  }

});
