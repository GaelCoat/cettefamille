
module.exports = Marionette.AppRouter.extend({

  routes: {
    '': 'home',
    'devenir': 'becoming',
    'chercher': 'looking',
  },

  home: function() { return this.render('home', null) },
  becoming: function() { return this.render('becoming', null) },
  looking: function() { return this.render('looking', null) },

  render: function(view, params) {

    console.log(this);
    this.trigger('router:render', {view: view, params: params});
    return this;
  }
});
