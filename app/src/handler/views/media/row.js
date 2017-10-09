module.exports = Marionette.View.extend({

  template: '#tpl-media',
  tagName: 'li',


  render: function() {

    var html = $(this.template).html();
    var template = _.template(html);

    console.log(this.model);

    this.$el.html(template({
      media: this.model
    }));

    return this;
  }

});
