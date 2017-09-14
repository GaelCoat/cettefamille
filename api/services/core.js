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
    }

  }
}
