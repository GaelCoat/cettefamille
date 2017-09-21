module.exports = Marionette.View.extend({

  template: '#tpl-testimony',
  tagName: 'li',

  events: {
    'click .delete': 'delete',
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

    this.$el.html(template({
      testimony: this.model
    }));

    return this;
  }

});
