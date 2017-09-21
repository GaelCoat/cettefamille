var tpl = require("pug-loader!./tpl.pug");

module.exports = Marionette.View.extend({

  className: 'row',

  getLastBlog: function() {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();
      $.ajax({ method: "GET", url: "/blog/last" })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(model) {

      return model;
    })
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      return that.getLastBlog();
    })
    .then(function(blog) {

      var html = tpl();
      var template = _.template(html);

      that.$el.html(template({
        blog: blog,
      }));

      return that;
    })
  }

});
