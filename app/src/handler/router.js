
module.exports = Marionette.AppRouter.extend({

  routes: {
    'handling': 'handling',
    'handling/blog/new(/:id)': 'newEntry',
    'handling/testimony/new(/:id)': 'newTestimony',
    'handling/:id': 'handlers',
  },

  handling: function() { return this.loadView('home/index', {tab: 'home'}) },
  handlers: function(id) { return this.loadView(id+'/index', {tab: id}) },

  newEntry: function(id) { return this.loadView('blog/new/index', {blog: id}) },
  newTestimony: function(id) { return this.loadView('testimony/new/index', {testimony: id}) },

  loadView: function(view, params) {

    this.trigger('router:render', {view: view, params: params});
    return this;
  }
});
