
var RowView = require('./row');

var Table = Marionette.CollectionView.extend({

  tagName: 'ul',
  childView: RowView,
});

var View = Marionette.View.extend({

  template: false,

  regions: {
    body: {
      el: 'ul',
      //replaceElement: true
    }
  },

  onRender: function() {

    this.showChildView('body', new Table({
      collection: this.collection
    }));

    return this;
  }
});

module.exports = View;
