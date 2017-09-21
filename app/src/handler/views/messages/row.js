module.exports = Marionette.View.extend({

  template: '#tpl-message',
  tagName: 'li',

  events: {
    'click': 'done',
    'click .delete': 'delete',
  },


  done: function() {

    this.$el.toggleClass('showed');

    var that = this;
    return q.fcall(function() {

      var defer = q.defer();
      that.model.save({seen: true}, {
        success: defer.resolve,
        error: defer.reject
      });
      return defer.promise;
    })
    .then(function(res) {

      that.$el.addClass('seen');
      return that;
    })
  },

  delete: function() {

    var that = this;
    return q.fcall(function() {

      var defer = q.defer();
      that.model.destroy({
        success: defer.resolve,
        error: defer.reject
      });
      return defer.promise;
    })
    .then(function(res) {

      return that.render();
    })
  },

  render: function() {

    var html = $(this.template).html();
    var template = _.template(html);

    if (this.model.get('seen')) this.$el.addClass('seen');

    this.$el.html(template({
      message: this.model
    }));

    return this;
  }

});
