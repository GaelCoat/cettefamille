var tpl = require("pug-loader!./tpl.pug");
var SimpleMDE = require('Simplemde');
var Blog = require('../../../../models/blog');

module.exports = Marionette.View.extend({

  editor: null,
  edition: false,
  className: 'blog',

  events: {
    'click #publish': 'publish'
  },

  initialize: function(params) {

    if (params.blog) this.blog = params.blog;
  },

  publish: function() {

    var that = this;

    var title = this.$el.find('#title').val();
    var content = this.editor.value();

    if (title.length <= 0 || content.length <= 0) return this;
    if (this.edition) return this.update(title, content);

    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'POST',
        url: '/blog/new',
        data: {
          title: title,
          content: content
        }
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(blog) {

      that.editor.value('');
      that.$el.find('#title').val('');
      return that.success();
    });
  },

  update: function(title, content) {

    var that = this;
    return q.fcall(function() {

      var defer = q.defer();
      that.blog.save({title: title, content: content}, {
        success: defer.resolve,
        error: defer.reject
      });
      return defer.promise;
    })
    .then(function(res) {

      return that;
    })
  },

  success: function() {

    var btn = this.$el.find('#publish');
    btn.addClass('success').find('span').text('Article créer')
    btn.find('i').text('check');

    _.delay(function() {

      btn.removeClass('success').find('span').text('Publier l\'article');
      btn.find('i').text('playlist_add_check');
    }, 2500);

    return this;
  },

  initMDE: function() {

    this.editor = new SimpleMDE({
      element: $("#article")[0],
      spellChecker: false
    });

    if (this.blog) {
      this.editor.value(this.blog.get('content'));
      this.$el.find('#title').val(this.blog.get('title'));
      this.$el.find('#publish span').text('Modifier l\'article');
    }
    return this;
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
      that.edition = true;
      return that;
    })
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());

      if (that.blog) return that.fetchBlog();
      return that;
    })
    .then(function() {

      return that.initMDE();
    })
  }

});
