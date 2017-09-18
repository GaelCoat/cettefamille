var req = require.context("./", true, /\.js$/);

module.exports = Marionette.View.extend({

  el: 'body',

  events: {
    'click a[soft]': 'handleRedirect',
    'click aside a[soft]': 'handleActiv',
    'click .open-dropdown': 'openDropdown',
    'click': 'closeDropdown',
  },

  regions: {
    //footer: "#footer",
    content: "content"
  },

  initialize: function() {

    this.$el.find('content').scroll(this.scroll);
  },

  scroll: _.throttle(function(e) {

    var el = $(e.currentTarget);
    var max = e.currentTarget.scrollHeight;
    if (el.scrollTop() + el.outerHeight() >= max) Backbone.trigger('page:fetch');
  }, 200),

  openDropdown: function(e) {

    e.preventDefault();
    e.stopPropagation();

    var target = this.$el.find(e.currentTarget);

    if (target.hasClass('open')) target.removeClass('open');
    else this.closeDropdown(), target.addClass('open');

    return this;
  },

  closeDropdown: function(e) {

    this.$el.find('.open-dropdown.open').removeClass('open');
    return this;
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
