var tpl = require("pug-loader!./tpl.pug");

module.exports = Marionette.View.extend({

  className: 'row forms',

  events: {
    'click button': 'send'
  },

  send: function(e) {

    var that = this;
    var fields = ['name', 'code', 'phone'];
    var errors = 0;
    var data = {};

    e.preventDefault();
    this.$el.find('.split').removeClass('error');

    fields.forEach(function(field) {

      var val = that.$el.find('#'+field+' input').val();
      if (val.length <= 0) that.$el.find('#'+field).addClass('error'), errors++;
      data[field] = val;
    })

    if (errors.length > 0) return this;


    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'POST',
        url: '/elderly',
        data: data
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(elderly) {

      return that.success();
    });
  },

  success: function() {

    var that = this;
    this.$el.find('input').val('');
    this.$el.find('button').text('Demande bien reçu').addClass('success');

    _.delay(function() {

      that.$el.find('button').text('Valider').removeClass('success');
    }, 8000);

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
