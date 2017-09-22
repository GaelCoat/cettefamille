module.exports = Marionette.View.extend({

  template: '#tpl-testimony-slider',
  tagName: 'li',

  render: function() {

    var html = $(this.template).html();
    var template = _.template(html);

    this.$el.html(template({
      testimony: this.model
    }));


    if (this.model.get('picture')) this.$el.find('.avatar').css({
      'background-image': 'url(../'+this.model.get('picture').url+')'
    });

    return this;
  }

});
