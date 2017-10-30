var tpl = require("pug-loader!./tpl.pug");

module.exports = Marionette.View.extend({

  className: 'row',

  initialize: function() {

    var that = this;

    $(window).scroll(function(e) {

      if ($(window).scrollTop() >= 300) $('#subheader').addClass('showed');
      else $('#subheader').removeClass('showed');
    })
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());
      return that;
    })
  }

});
