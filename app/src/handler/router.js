
module.exports = Marionette.AppRouter.extend({

  routes: {
    'handling': 'handling',
    'handling/blog/new(/:id)': 'newEntry',
    'handling/:id': 'handlers',
  },

  handling: function() { return this.loadView('home/index', null) },
  handlers: function(id) { return this.loadView(id+'/index', null) },

  newEntry: function(id) { return this.loadView('blog/new/index', {blog: id}) },

  loadView: function(view, params) {

    this.trigger('router:render', {view: view, params: params});
    return this;
  }
});
