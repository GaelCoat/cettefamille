var tpl = require("pug-loader!./tpl.pug");
var Collection = require('../../../collections/testimony');
var Table = require('./table');

module.exports = Marionette.View.extend({

  className: 'table testimony',

  sorting: 'idling',
  page: 1,
  ended: false,

  events: {
  },

  initialize: function() {

    this.collection = new Collection();
    this.listenTo(Backbone, 'page:fetch', this.pagination);
  },

  pagination: function(e) {

    if (this.ended || this.collection.length < 20) return this;
    this.page++;
    return this.fetch(false);
  },

  fetch: function(reset) {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();
      $.ajax({ method: "GET", url: "/testimony/list?page="+that.page })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(res) {

      if (res.list.length < 20) that.ended = true;

      if (reset) that.collection.reset();
      that.collection.add(res.list);

      return that;
    })
  },

  renderTable: function() {

    this.table = new Table({
      el: this.$el.find('#list').get(0),
      collection: this.collection
    });

    return this.table.render();
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());
      return that.fetch(true);
    })
    .then(function() {

      return that.renderTable();
    })

  }

});
