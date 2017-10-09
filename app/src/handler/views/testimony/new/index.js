var tpl = require("pug-loader!./tpl.pug");
var Testimony = require('../../../../models/testimony');

module.exports = Marionette.View.extend({

  edition: false,

  modifiedPicture: false,
  picture: null,
  className: 'blog testimony',

  events: {
    'click #publish': 'publish',
    'click #remove-picture': 'removePicture',
    'change #cover': 'cover'
  },

  initialize: function(params) {

    if (params.testimony) this.testimony = params.testimony;
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

  publish: function() {

    var that = this;

    var name = this.$el.find('#name').val();
    var location = this.$el.find('#location').val();
    var content = this.$el.find('#content').val();

    if (name.length <= 0 || location.length <= 0 || content.length <= 0) return this;

    this.done = false;

    if (this.edition) return this.update(name, location, content);

    if (this.picture) this.showUploadLoader();

    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'POST',
        url: '/testimony/new',
        data: {
          name: name,
          location: location,
          content: content,
          picture: that.picture
        }
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(testimony) {

      that.$el.find('.upload-loader').hide();
      that.$el.find('.infos').val('');
      that.$el.find('.upload').show();
      that.$el.find('.cover').hide();
      return that.success('Témoignage créé', 'Publier le témoignage');
    });
  },

  update: function(name, location, content) {

    var that = this;

    return q.fcall(function() {

      var data = {
        name: name,
        location: location,
        content: content,
        picture: true
      }

      if (that.modifiedPicture && (that.picture === null)) data.picture = false;
      else if (that.modifiedPicture && that.picture) data.picture = that.picture, that.showUploadLoader();

      var defer = q.defer();
      that.testimony.save(data, {
        success: defer.resolve,
        error: defer.reject
      });
      return defer.promise;
    })
    .then(function(res) {

      that.$el.find('.upload-loader').hide();
      return that.success('Témoignage modifié', 'Modifier le témoignage');
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

      Backbone.trigger('redirect', '/handling/testimony');

    }, 1500);

    return this;
  },

  fetchTestimony: function() {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();
      $.ajax({ method: "GET", url: "/testimony/"+that.testimony })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(model) {

      that.testimony = new Testimony(model);
      that.edition = true;
      return that;
    })
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());

      if (that.testimony) return that.fetchTestimony();
      return that;
    })
    .then(function() {

      if (that.testimony) {
        that.$el.find('#content').val(that.testimony.get('content'));
        that.$el.find('#name').val(that.testimony.get('name'));
        that.$el.find('#location').val(that.testimony.get('location'));
        that.$el.find('#publish span').text('Modifier le témoignage');

        if (that.testimony.get('picture')) {

          that.$el.find('.upload').hide();
          that.$el.find('.cover').css('display', 'inline-block');
          that.$el.find('.cover img').attr('src', that.testimony.get('picture').url);
        }
      }
    })
  }

});
