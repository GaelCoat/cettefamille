var tpl = require("pug-loader!./tpl.pug");
var Blog = require('../../../../models/blog');
var Converter = require('markdown').markdown;

module.exports = Marionette.View.extend({

  className: 'row',
  id: 'article',

  initialize: function(params) {

    if (params.blog) this.blog = params.blog;
  },

  fetchBlog: function() {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();
      $.ajax({ method: "GET", url: "/blog/"+that.blog })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(model) {

      that.blog = new Blog(model);
      return that;
    })
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      return that.fetchBlog();
    })
    .then(function() {

      var html = tpl();
      var template = _.template(html);

      that.$el.html(template({
        blog: that.blog,
        content: Converter.toHTML(that.blog.get('content'))
      }));

      if (that.blog.get('picture')) that.$el.find('#cover').show().attr('src', that.blog.get('picture').url);
      return that;
    })
  }

});
