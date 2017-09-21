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
    var reader = new FileReader();
    this.modifiedPicture = true;

    reader.onload = function() {

      that.picture = reader.result;
      that.$el.find('.upload').hide();
      that.$el.find('.cover').css('display', 'inline-block');
      that.$el.find('.cover img').attr('src', that.picture);
    }

    reader.readAsDataURL(file);
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
    if (this.edition) return this.update(name, location, content);

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

      that.$el.find('.infos').val('');
      that.$el.find('.cover').hide();
      return that.success();
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
      else if (that.modifiedPicture && that.picture) data.picture = that.picture;

      var defer = q.defer();
      that.testimony.save(data, {
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
    btn.addClass('success').find('span').text('Témoignage créer')
    btn.find('i').text('check');

    _.delay(function() {

      btn.removeClass('success').find('span').text('Publier le témoignage');
      btn.find('i').text('playlist_add_check');
    }, 2500);

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
        that.$el.find('#publish span').text('Modifier l\'article');

        if (that.testimony.get('picture')) {

          that.$el.find('.upload').hide();
          that.$el.find('.cover').css('display', 'inline-block');
          that.$el.find('.cover img').attr('src', that.testimony.get('picture').url);
        }
      }
    })
  }

});
