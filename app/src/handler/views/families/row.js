module.exports = Marionette.View.extend({

  template: '#tpl-family',
  tagName: 'li',

  events: {
    'click .delete': 'delete',
    'click .done': 'done',
    'click .pending': 'pending',
  },

  done: function() { return this.changeState('done'); },
  pending: function() { return this.changeState('pending'); },

  changeState: function(state) {

    var that = this;
    return q.fcall(function() {

      var defer = q.defer();
      that.model.save({process: {state: state}}, {
        success: defer.resolve,
        error: defer.reject
      });
      return defer.promise;
    })
    .then(function(res) {

      console.log(res);
      return that.render();
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

    this.$el.html(template({
      family: this.model
    }));

    return this;
  }

});
