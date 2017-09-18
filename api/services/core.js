var q = require('q');
var _ = require('underscore');

module.exports = function() {

  return {

    model: null,

    create: function(data) {

      var that = this;

      return q.fcall(function() {

        var defer = q.defer();
        var item = new that.model(data);

        item.save(function(err) {

          if (err) defer.reject(err);
          else defer.resolve(item);
        });

        return defer.promise;
      });
    },

    update: function(id, data) {

      if (!id) return false;

      var that = this;
      var defer = q.defer();

      // On met à jour les données
      that.model.findOneAndUpdate({ _id: id }, data, { 'new': true }, function(err, obj) {

        if (err) defer.reject(err);
        else defer.resolve(obj);
      });

      return defer.promise;
    },

    remove: function(id) {

      var that = this;

      return q.fcall(function() {

        var defer = q.defer();

        that.model.remove({_id: id},function(err) {

          if (err) defer.reject(err);
          else defer.resolve();
        });

        return defer.promise;
      });
    },

  }
}
