var q = require('q');
var _ = require('underscore');

// Les models
var model = require('../models/blog');

// Les services
var core = new require('./core')();
var Picture = require('./picture');

var service = _.extend(core, {

  model: model,

  getCount: function() {

    var that = this;

    return q.fcall(function() {

      return that.model
                  .count()
                  .exec()
    })
  },

  getLast: function() {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({}, {}, {sort: {'created' : -1}}).exec();
    })
  },

  getList: function(page) {

    var that = this;
    var size = 20;
    var start = (page - 1) * size;

    return q.fcall(function() {

      return that.model
                  .find()
                  .limit(size)
                  .skip(start)
                  .select('title created')
                  .sort('-created')
                  .exec()
    })
  },

  getOne: function(id) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).populate('picture').exec()
    })
  },

  modify: function(id, data, deletion) {

    var that = this;
    var ref = null;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).exec();
    })
    .then(function(model) {

      ref = model;

      if (model.get('picture') && deletion) return Picture.delete(model.get('picture'));
      return that;
    })
    .then(function() {

      var promises = [];

      _.forEach(data.content, function(item) {

        var str = item.insert.image;

        if (str && !str.match(/https/gi)) {

          var url = that.uploadImage(item.insert.image);

          url.then(function(picture) {

            item.insert.image = picture.get('url');
          })

          promises.push(url);
        }
      })

      return promises;
    })
    .all()
    .then(function(images) {

      data.images = _.union(ref.get('images'), images);

      return that.update(id, data);
    })
    .catch(function(err) {

      console.log(err);
    })
  },

  delete: function(id) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).exec();
    })
    .then(function(model) {

      var promises = [];

      if (model.get('picture')) promises.push(Picture.delete(model.get('picture')));
      if (model.get('images').length > 0) {

        model.get('images').forEach(function(image) {

          promises.push(Picture.delete(image._id));
        })
      }
      return promises;
    })
    .all()
    .then(function() {

      return that.remove(id);
    })
  },

  uploadImage: function(uri) {

    var that = this;

    return q.fcall(function() {

      return Picture.upload(uri);
    })
    .then(function(model) {

      return model;
    })
  },

  new: function(data) {

    var that = this;

    return q.fcall(function() {

      var promises = [];

      _.forEach(data.content, function(item) {

        if (item.insert.image) {

          var url = that.uploadImage(item.insert.image);

          url.then(function(model) {

            item.insert.image = model.get('url');
          })

          promises.push(url)
        }
      })

      return promises;
    })
    .all()
    .then(function(images) {

      data.images = images;

      return that.create(data);
    })
  }

});

module.exports = service;
