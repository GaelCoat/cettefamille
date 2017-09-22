
var RowView = require('./row');

var Table = Marionette.CollectionView.extend({

  tagName: 'ul',
  childView: RowView,
});

var View = Marionette.View.extend({

  template: false,

  regions: {
    body: {
      el: '.wrap',
      //replaceElement: true
    }
  },

  events: {
    'click .dot': 'slideTo',
    'click .fa-arrow-left': 'previous',
    'click .fa-arrow-right': 'next',
  },

  currentSlide: 0,
  maxSlide: 0,

  slideTo: function(e) {

    var dot = this.$el.find(e.currentTarget);
    this.currentSlide = dot.data('slide');
    return this.slide();
  },

  previous: function() {

    if (this.currentSlide === 0) this.currentSlide = this.maxSlide - 1;
    else this.currentSlide--;
    return this.slide();
  },

  next: function() {

    if (this.currentSlide === this.maxSlide - 1) this.currentSlide = 0;
    else this.currentSlide++;
    return this.slide();
  },

  slide: function() {

    this.$el.find('li').removeClass('current');
    this.$el.find('li:nth-child('+(this.currentSlide + 1)+')').addClass('current');

    this.$el.find('.dot').removeClass('current');
    this.$el.find(".dot[data-slide='"+this.currentSlide+"']").addClass('current');
    return this;
  },

  renderDots: function() {

    this.maxSlide = this.collection.length;

    for (var i = 0; i < this.maxSlide; i++) this.renderDot(i);

    return this;
  },

  renderDot: function(i) {

    var dot = $('<div>').attr('data-slide', i).addClass('dot');

    if (i === 0) dot.addClass('current');
    this.$el.find('.dots').append(dot);
    return this;
  },

  onRender: function() {

    this.showChildView('body', new Table({
      collection: this.collection
    }));

    this.$el.find('li:first-child').addClass('current');

    return this.renderDots();
  }
});

module.exports = View;
