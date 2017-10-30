var tpl = require("pug-loader!./tpl.pug");
var Blog = require('../../../../models/blog');
var Converter = require('quill-delta-to-html');

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

      var converter = new Converter(that.blog.get('content'));
      var content = converter.convert();

      that.$el.html(template({
        blog: that.blog,
        content: content,
      }));

      if (that.blog.get('picture')) that.$el.find('#cover').show().attr('src', that.blog.get('picture').url);
      return that;
    })
    .catch(function(err) {

      console.log();
    })
  }

});
