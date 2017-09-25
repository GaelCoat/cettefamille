var tpl = require("pug-loader!./tpl.pug");

module.exports = Marionette.View.extend({

  className: 'row',

  events: {
    'click a.anchor': 'anchor'
  },

  anchor: function(e) {

    var that = this;

    var to = that.$el.find(e.currentTarget).data('anchor');
    if ($('#'+to).get(0)) return $('html, body').animate( { scrollTop: $('#'+to).offset().top }, 600 );

    _.delay(function() {

      $('html, body').animate( { scrollTop: $('#'+to).offset().top }, 600 );
    }, 500);

    return this;
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());
      return that;
    })
  }

});
