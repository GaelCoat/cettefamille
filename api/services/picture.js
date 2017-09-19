var q = require('q');
var _ = require('underscore');
var fs = require('fs');

// Les models
var model = require('../models/picture');

// Les services
var core = new require('./core')();

var service = _.extend(core, {

  model: model,

  upload: function(uri) {

    var that = this;

    var mime = uri.split(",")[0].split(":")[1].split(";")[0];;

    return q.fcall(function() {

      return that.create({type: mime});
    })
    .then(function(model) {

      var defer = q.defer();
      var image = uri.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      var path = 'app/build/';
      var url = 'img/uploads/'+model.get('_id')+'.png';

      fs.writeFile(path+url, image, 'base64', function(err) {
        if (err) defer.reject(err)
        defer.resolve(url);
      });

      return [
        model.get('_id'),
        defer.promise
      ]
    })
    .all()
    .spread(function(id, url) {

      return that.update(id, {url: url});
    })
    .catch(function(err) {

      console.log(err);
    })
  },

});

module.exports = service;
