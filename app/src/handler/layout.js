var req = require.context("./", true, /\.js$/);

module.exports = Marionette.View.extend({

  el: 'body',

  events: {
    'click a[soft]': 'handleRedirect',
    'click aside a[soft]': 'handleActiv',
  },

  regions: {
    //footer: "#footer",
    content: "content"
  },

  //-------------------------------------
  // Soft Redirect
  //-------------------------------------
  handleRedirect: function(e) {

    var href = $(e.currentTarget).attr('href');
    var protocol = this.protocol + '//';

    if (href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      this.trigger('redirect', href)
    }

    return this;
  },

  handleActiv: function(e) {

    this.$el.find('a[soft]').parent().removeClass('activ');
    this.$el.find(e.currentTarget).parent().addClass('activ');

    return this;
  },

  loadView: function(path, params) {

    var ItemView = req('./views/'+path+'.js');

    var view = new ItemView(params);
    this.getRegion('content').empty();
    this.getRegion('content').show(view);

    return this;
  }


});
