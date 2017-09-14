var req = require.context("./", true, /\.js$/);

module.exports = Marionette.View.extend({

  el: 'body',

  regions: {
    //footer: "#footer",
    content: "main",
    header: "header",
    footer: "footer"
  },

  events: {
    'mouseenter .has-droplet': 'drop',
    'click a[soft]': 'handleRedirect',
  },

  drop: function(e) {

    var el = $(e.currentTarget);
    var pos = {x: e.offsetX, y: e.offsetY};
    var adjust = el.find('.droplet').width() / 2;

    el.find('.droplet').css({
      top: pos.y,
      left: pos.x,
      'margin-left': '-'+adjust+'px',
      'margin-top': '-'+adjust+'px'
    });
    return this;
  },

  handleRedirect: function(e) {


    var href = $(e.currentTarget).attr('href');
    var protocol = this.protocol + '//';

    if (href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      this.trigger('redirect', href)
    }

    return this;
  },

  loadView: function(path, params) {

    var ItemView = req('./views/'+path+'.js');
    var view = new ItemView(params);

    this.getRegion('content').show(view);

    return this;
  },

  renderHeader: function() {

    var ItemView = req('./views/header/index.js');

    var view = new ItemView();
    this.getRegion('header').empty();
    this.getRegion('header').show(view);

    return this;
  },

  renderFooter: function() {

    var ItemView = req('./views/footer/index.js');

    var view = new ItemView();
    this.getRegion('footer').empty();
    this.getRegion('footer').show(view);

    return this;
  },

  render: function() {

    return [
      this.renderHeader(),
      this.renderFooter()
    ];
  },


});
