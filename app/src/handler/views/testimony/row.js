var Deletion = require('./delete');

module.exports = Marionette.View.extend({

  template: '#tpl-testimony',
  tagName: 'li',

  events: {
    'click .delete': 'delete',
  },

  events: {
    'click .delete': 'showDeletion',
  },

  showDeletion: function() {

    var that = this;
    this.deletion = new Deletion();
    this.deletion.on('delete', this.delete.bind(this));
    this.deletion.on('cancel', function() {

      that.deletion.remove();
    });

    return this.deletion.render();
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

      that.deletion.remove();
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
