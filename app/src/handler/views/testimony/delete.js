module.exports = Marionette.View.extend({

  template: '#tpl-deletion',
  id: 'deletion',

  events: {
    'click .delete': 'delete',
    'click .cancel': 'cancel',
  },

  delete: function() { this.trigger('delete');  },
  cancel: function() { this.trigger('cancel');  },

  render: function() {

    var html = $(this.template).html();
    var template = _.template(html);

    this.$el.html(template());

    $('body').append(this.$el);

    return this.$el.show();
  }

});
