var tpl = require("pug-loader!./tpl.pug");
var Collection = require('../../../collections/testimony');
var Table = require('./table');

module.exports = Marionette.View.extend({

  id: 'home',

  events: {
    'input textarea': 'autosize',
    'click #send': 'send',
  },

  testimonies: null,

  initialize: function() {

    this.testimonies = new Collection();
  },

  autosize: function(e) {

    var el = this.$el.find(e.currentTarget);
    el.css('height', e.currentTarget.scrollHeight);
    return this;
  },

  send: function(e) {

    var that = this;
    var fields = ['name', 'phone', 'message'];
    var errors = 0;
    var data = {};

    e.preventDefault();
    this.$el.find('form input, form textarea').removeClass('error');

    fields.forEach(function(field) {

      var val = that.$el.find('#'+field).val();
      if (val.length <= 0) that.$el.find('#'+field).addClass('error'), errors++;
      data[field] = val;
    })

    if (errors > 0) return this;

    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'POST',
        url: '/message',
        data: data
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(message) {

      return that.success();
    });
  },

  success: function() {

    var that = this;
    this.$el.find('form input, form textarea').val('');
    this.$el.find('#send').addClass('success').find('span').text('Message envoyé');
    this.$el.find('#send i').attr('class', 'fa fa-check');

    _.delay(function() {

      that.$el.find('#send').removeClass('success').find('span').text('Envoyer');
      that.$el.find('#send i').attr('class', 'fa fa-paper-plane');
    }, 8000);

    return this;
  },

  fetchTestimonies: function() {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();
      $.ajax({ method: "GET", url: "/testimony/list?page=1&limit=5" })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(res) {

      that.testimonies.add(res.list);
      return that.renderTestimonies();
    })
  },

  renderTestimonies: function() {

    this.table = new Table({
      el: this.$el.find('#testimonies').get(0),
      collection: this.testimonies
    });

    return this.table.render();
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      $('body').addClass('blue');
      that.$el.html(tpl());
      return that.fetchTestimonies();
    })
  }

});
