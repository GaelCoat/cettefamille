
module.exports = Marionette.AppRouter.extend({

  routes: {
    '': 'home',
    'devenir': 'becoming',
    'chercher': 'looking',
    'faq': 'faq',
    'cgu': 'cgu',
    'actualites': 'blog',
    'actualites/:id': 'entry',
    'temoignages': 'testimony',
  },

  home: function() { return this.render('home/index', null) },
  becoming: function() { return this.render('family/index', null) },
  looking: function() { return this.render('elderly/index', null) },
  faq: function() { return this.render('faq/index', null) },
  cgu: function() { return this.render('cgu/index', null) },
  blog: function() { return this.render('blog/index', null) },
  entry: function(id) { return this.render('blog/entry/index', {blog: id}) },
  testimony: function() { return this.render('testimony/index', null) },

  render: function(view, params) {

    this.trigger('router:render', {view: view, params: params});
    return this;
  }
});
