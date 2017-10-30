var tpl = require("pug-loader!./tpl.pug");
var Quill = require('quill');
var Blog = require('../../../../models/blog');

module.exports = Marionette.View.extend({

  editor: null,
  edition: false,

  picture: null,
  modifiedPicture: false,

  className: 'blog',

  events: {
    'click #publish': 'publish',
    'click #remove-picture': 'removePicture',
    'change #cover': 'cover'
  },

  initialize: function(params) {

    if (params.blog) this.blog = params.blog;
  },

  cover: function() {

    var that = this;
    var file = this.$el.find('#cover')[0].files[0];
    this.$el.find('#cover').val('');
    this.$el.find('.upload-alert').hide();
    var reader = new FileReader();
    this.modifiedPicture = true;

    var size = file.size / 1024;
    if (size >= 2000) return this.showUploadAlert();

    reader.onload = function() {

      that.picture = reader.result;
      that.$el.find('.upload').hide();
      that.$el.find('.cover').css('display', 'inline-block');
      that.$el.find('.cover img').attr('src', that.picture);
    }

    reader.readAsDataURL(file);
    return this;
  },

  showUploadAlert: function() {

    this.modifiedPicture = false;
    this.$el.find('.upload-alert').show();
    return this;
  },

  showUploadLoader: function() {

    var that = this;

    _.delay(function() {

      if (!that.done) that.$el.find('.upload-loader').show();
    }, 800);

    return this;
  },

  removePicture: function() {

    this.modifiedPicture = true;
    this.picture = null;
    this.$el.find('.upload').show();
    this.$el.find('.cover').hide();
    this.$el.find('.cover img').attr('src', '');
    return this;
  },

  hasB64: function(data) {

    var image = false;

    _.forEach(data.ops, function(item) {

      var str = item.insert.image;

      if (str && !str.match(/https/gi)) image = true;
    })

    return image;
  },

  publish: function() {

    var that = this;

    var title = this.$el.find('#title').val();
    var description = this.$el.find('#description').val();
    var content = this.editor.getContents();
    var length = this.editor.getLength();

    if (title.length <= 0 || description.length <= 0 || length <= 1) return this;

    this.done = false;

    if (this.edition) return this.update(title, description, content);

    if (this.picture || this.hasB64(content)) this.showUploadLoader();

    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'POST',
        url: '/blog/new',
        data: {
          title: title,
          description: description,
          content: content.ops,
          picture: that.picture
        }
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(blog) {

      that.$el.find('.upload-loader').hide();

      that.$el.find('.infos').val('');
      that.$el.find('.upload').show();
      that.$el.find('.cover').hide();
      return that.success('Article créé', 'Publier l\'article');
    })
    .catch(function(err) {

      console.log(err);
    })
  },

  update: function(title, description, content) {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();

      var data = {
        title: title,
        description: description,
        content: content.ops,
        picture: true
      }

      if (that.hasB64(content)) that.showUploadLoader();
      else if (that.modifiedPicture && (that.picture === null)) data.picture = false;
      else if (that.modifiedPicture && that.picture) data.picture = that.picture, that.showUploadLoader();

      that.blog.save(data, {
        success: defer.resolve,
        error: defer.reject
      });
      return defer.promise;
    })
    .then(function(res) {

      that.$el.find('.upload-loader').hide();
      return that.success('Article modifié', 'Modifier l\'article');
    })
  },

  success: function(txt, reset) {

    this.done = true;

    var btn = this.$el.find('#publish');
    btn.addClass('success').find('span').text(txt)
    btn.find('i').text('check');

    _.delay(function() {

      btn.removeClass('success').find('span').text(reset);
      btn.find('i').text('playlist_add_check');

      Backbone.trigger('redirect', '/handling/blog');

    }, 1500);

    return this;
  },


  initEditor: function() {

    var that = this;

    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'link', 'image'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];

    this.editor = new Quill('#editor', {
      modules: { toolbar: toolbarOptions},
      theme: 'snow'
    });

    if (this.blog) {
      this.editor.setContents(this.blog.get('content'));
      this.$el.find('#title').val(this.blog.get('title'));
      this.$el.find('#description').val(this.blog.get('description'));
      this.$el.find('#publish span').text('Modifier l\'article');

      if (this.blog.get('picture')) {

        this.$el.find('.upload').hide();
        this.$el.find('.cover').css('display', 'inline-block');
        this.$el.find('.cover img').attr('src', this.blog.get('picture').url);
      }
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

      return that.initEditor();
    })
  }

});
