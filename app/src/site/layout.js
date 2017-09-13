var req = require.context("./", true, /\.js$/);

module.exports = Marionette.View.extend({

  el: 'body',

  regions: {
    //footer: "#footer",
    content: "main"
  },

  loadView: function(path, params) {

    var ItemView = req('./views/'+path+'.js');

    var view = new ItemView(params);
    this.getRegion('content').empty();
    this.getRegion('content').show(view);

    return this;
  }


});
