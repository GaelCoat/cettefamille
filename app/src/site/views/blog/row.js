module.exports = Marionette.View.extend({

  template: '#tpl-blog-preview',
  tagName: 'article',

  render: function() {

    var html = $(this.template).html();
    var template = _.template(html);

    this.$el.html(template({
      blog: this.model
    }));

    return this;
  }

});
