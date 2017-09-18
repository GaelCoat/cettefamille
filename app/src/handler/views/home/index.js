var tpl = require("pug-loader!./tpl.pug");
var req = require.context("./", true, /\.js$/);

module.exports = Marionette.View.extend({

  regions: {
    'families': '#families',
    'elderly': '#elderly'
  },

  renderFamilies: function() {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'GET',
        url: '/family/count'
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(res) {

      that.$el.find('#families .count').text(res.count)
    });
  },

  renderElderly: function() {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'GET',
        url: '/elderly/count'
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(res) {

      that.$el.find('#elderly .count').text(res.count)
    });
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());

      return [
        that.renderFamilies(),
        that.renderElderly()
      ];
    })

  }

});
