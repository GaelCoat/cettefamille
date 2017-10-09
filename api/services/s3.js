var q = require('q');
var _ = require('underscore');
var Config = require('config');
var knox = require('knox');
var fs = require('fs');
var path = require('path');
var crypto = require("crypto");

var options = {
  key: Config.s3.accessKeyId,
  secret: Config.s3.secretAccessKey,
  bucket: Config.s3.bucket,
  region: "eu-west-1"
};

// Si un endpoint est préciser, on l'utilise
if (Config.s3.endpoint && Config.s3.endpoint.length > 0) {

  options.endpoint = Config.s3.endpoint;
}

var client = knox.createClient(options);

var ws = {

  config: { url: Config.s3.host },

  replace: function(localname, distname, del) {

    var that = this;

    return this
      .delete(distname)
      .then(function(distname) {

        return that.upload(localname, distname, del);
      });
  },

  upload: function(data, type, name) {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();

      var buffer = new Buffer(data.replace(/^data:image\/\w+;base64,/, ""),'base64');
      var headers = {
        'Content-Type': type,
        'x-amz-acl': 'public-read'
      };

      client.putBuffer(buffer, '/images/'+name, headers, function(err, res){

        if (err) return defer.reject(err);
        defer.resolve({
          url: 'https://'+client.host+'/images/'+name,
          name: '/images/'+name
        });
      });

      return defer.promise;
    })
  },

  list: function(prefix) {

    var defer = q.defer();

    client.list({ prefix: prefix }, function(err, data){

      if (err) return defer.reject(err);
      defer.resolve(data);
    });
    return defer.promise;
  },

  delete: function(distname) {

    var defer = q.defer();
    client.deleteFile(distname, function(err) {

      if (err) return defer.reject(err);
      defer.resolve();
    });
    return defer.promise;
  },

};

module.exports = ws;
