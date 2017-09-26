var tpl = require("pug-loader!./tpl.pug");

module.exports = Marionette.View.extend({

  className: 'row gir',
  id: 'gir',

  events: {
    'click .check': 'check',
    'click .restart': 'restart'
  },

  answers: {
    coherence: 'A',
    orientation: 'A',
    toilette: 'A',
    habillage: 'A',
    alimentation: 'A',
    elimination: 'A',
    transferts: 'A',
    deplacements: 'A'
  },

  restart: function() {

    this.$el.find(".check").removeClass('checked');
    this.$el.find(".check[data-answer=A]").addClass('checked');

    this.answers = {
      coherence: 'A',
      orientation: 'A',
      toilette: 'A',
      habillage: 'A',
      alimentation: 'A',
      elimination: 'A',
      transferts: 'A',
      deplacements: 'A'
    };

    return this.calculate();
  },

  check: function(e) {

    var check = this.$el.find(e.currentTarget);
    var item = check.data('item');
    var answer = check.data('answer');

    this.$el.find(".check[data-item="+item+"]").removeClass('checked');
    check.addClass('checked');

    this.answers[item] = answer;

    return this.calculate();
  },

  calculate: function() {

    var rang = 0;
    var groupe = 0;
    var gir = 0;

    // Groupe A
    if (rang === 0) {

      groupe = 0;

      if (this.answers.coherence === 'C') groupe += 2000;
      if (this.answers.orientation === 'C') groupe += 1200;
      if (this.answers.toilette === 'C') groupe += 40;
      if (this.answers.habillage === 'C') groupe += 40;
      if (this.answers.alimentation === 'C') groupe += 60;
      if (this.answers.elimination === 'C') groupe += 100;
      if (this.answers.transferts === 'C') groupe += 800;
      if (this.answers.deplacements === 'C') groupe += 200;
      //
      if (this.answers.toilette === 'B') groupe += 16;
      if (this.answers.habillage === 'B') groupe += 16;
      if (this.answers.alimentation === 'B') groupe += 20;
      if (this.answers.elimination === 'B') groupe += 16;
      if (this.answers.transferts === 'B') groupe += 120;
      if (this.answers.deplacements === 'B') groupe += 32;
      //
      if (groupe >= 3390 ) rang = 3;
      if (groupe >= 4140 ) rang = 2;
      if (groupe >= 4380 ) rang = 1;
    }

    // Groupe B
    if (rang === 0) {

      groupe = 0;
      if (this.answers.coherence === 'C') groupe += 1500;
      if (this.answers.orientation === 'C') groupe += 1200;
      if (this.answers.toilette === 'C') groupe += 40;
      if (this.answers.habillage === 'C') groupe += 40;
      if (this.answers.alimentation === 'C') groupe += 60;
      if (this.answers.elimination === 'C') groupe += 100;
      if (this.answers.transferts === 'C') groupe += 800;
      if (this.answers.deplacements === 'C') groupe += -80;
      //
      if (this.answers.coherence === 'B') groupe += 320;
      if (this.answers.orientation === 'B') groupe += 120;
      if (this.answers.toilette === 'B') groupe += 16;
      if (this.answers.habillage === 'B') groupe += 16;
      if (this.answers.alimentation === 'B') groupe += 0;
      if (this.answers.elimination === 'B') groupe += 16;
      if (this.answers.transferts === 'B') groupe += 120;
      if (this.answers.deplacements === 'B') groupe += -40;
      //
      if (groupe >= 2016) rang = 4;
    }

    //Groupe C
    if (rang === 0) {

      groupe = 0;

      if (this.answers.toilette === 'C') groupe += 40;
      if (this.answers.habillage === 'C') groupe += 40;
      if (this.answers.alimentation === 'C') groupe += 60;
      if (this.answers.elimination === 'C') groupe += 160;
      if (this.answers.transferts === 'C') groupe += 1000;
      if (this.answers.deplacements === 'C') groupe += 400;
      //
      if (this.answers.toilette === 'B') groupe += 16;
      if (this.answers.habillage === 'B') groupe += 16;
      if (this.answers.alimentation === 'B') groupe += 20;
      if (this.answers.elimination === 'B') groupe += 20;
      if (this.answers.transferts === 'B') groupe += 200;
      if (this.answers.deplacements === 'B') groupe += 40;
      //
      if (groupe >= 1432) rang = 6;
      if (groupe >= 1700) rang = 5;
    }

    //Groupe D
    if (rang === 0) {

      groupe = 0;

      if (this.answers.alimentation === 'C') groupe += 2000;
      if (this.answers.elimination === 'C') groupe += 400;
      if (this.answers.transferts === 'C') groupe += 2000;
      if (this.answers.deplacements === 'C') groupe += 200;
      //
      if (this.answers.alimentation === 'B') groupe += 200;
      if (this.answers.elimination === 'B') groupe += 200;
      if (this.answers.transferts === 'B') groupe += 200;
      //
      if (groupe >= 2400) rang = 7;
    }

    //Groupe E
    if (rang === 0) {

      groupe = 0;

      if (this.answers.coherence === 'C') groupe += 400;
      if (this.answers.orientation === 'C') groupe += 400;
      if (this.answers.toilette === 'C') groupe += 400;
      if (this.answers.habillage === 'C') groupe += 400;
      if (this.answers.alimentation === 'C') groupe += 400;
      if (this.answers.elimination === 'C') groupe += 800;
      if (this.answers.transferts === 'C') groupe += 800;
      if (this.answers.deplacements === 'C') groupe += 200;
      //
      if (this.answers.toilette === 'B') groupe += 100;
      if (this.answers.habillage === 'B') groupe += 100;
      if (this.answers.alimentation === 'B') groupe += 100;
      if (this.answers.elimination === 'B') groupe += 100;
      if (this.answers.transferts === 'B') groupe += 100;
      //
      if (groupe >= 1200) rang = 8;
    }

    //Groupe F
    if (rang === 0) {

      groupe = 0;

      if (this.answers.coherence === 'C') groupe += 200;
      if (this.answers.orientation === 'C') groupe += 200;
      if (this.answers.toilette === 'C') groupe += 500;
      if (this.answers.habillage === 'C') groupe += 500;
      if (this.answers.alimentation === 'C') groupe += 500;
      if (this.answers.elimination === 'C') groupe += 500;
      if (this.answers.transferts === 'C') groupe += 500;
      if (this.answers.deplacements === 'C') groupe += 200;
      //
      if (this.answers.coherence === 'B') groupe += 100;
      if (this.answers.orientation === 'B') groupe += 100;
      if (this.answers.toilette === 'B') groupe += 100;
      if (this.answers.habillage === 'B') groupe += 100;
      if (this.answers.alimentation === 'B') groupe += 100;
      if (this.answers.elimination === 'B') groupe += 100;
      if (this.answers.transferts === 'B') groupe += 100;
      //
      if (groupe >= 800) rang = 9;
    }

    //Groupe G
    if (rang === 0) {

      groupe = 0;

      if (this.answers.coherence === 'C') groupe += 150;
      if (this.answers.orientation === 'C') groupe += 150;
      if (this.answers.toilette === 'C') groupe += 300;
      if (this.answers.habillage === 'C') groupe += 300;
      if (this.answers.alimentation === 'C') groupe += 500;
      if (this.answers.elimination === 'C') groupe += 500;
      if (this.answers.transferts === 'C') groupe += 400;
      if (this.answers.deplacements === 'C') groupe += 200;
      //
      if (this.answers.toilette === 'B') groupe += 200;
      if (this.answers.habillage === 'B') groupe += 200;
      if (this.answers.alimentation === 'B') groupe += 200;
      if (this.answers.elimination === 'B') groupe += 200;
      if (this.answers.transferts === 'B') groupe += 200;
      if (this.answers.deplacements === 'B') groupe += 100;
      //
      if (groupe >= 650) rang = 10;
    }

    //Groupe H
    if (rang === 0) {

      groupe = 0;

      if (this.answers.toilette === 'C') groupe += 3000;
      if (this.answers.habillage === 'C') groupe += 3000;
      if (this.answers.alimentation === 'C') groupe += 3000;
      if (this.answers.elimination === 'C') groupe += 3000;
      if (this.answers.transferts === 'C') groupe += 1000;
      if (this.answers.deplacements === 'C') groupe += 1000;
      //
      if (this.answers.toilette === 'B') groupe += 2000;
      if (this.answers.habillage === 'B') groupe += 2000;
      if (this.answers.alimentation === 'B') groupe += 2000;
      if (this.answers.elimination === 'B') groupe += 2000;
      if (this.answers.transferts === 'B') groupe += 2000;
      if (this.answers.deplacements === 'B') groupe += 1000;
      //
      if (groupe < 2000) rang = 13;
      if (groupe >= 2000) rang = 12;
      if (groupe >= 4000) rang = 11;
    }


    //Détermination du Gir
    if (rang === 13 ) gir = 6;
    if (rang === 12 ) gir = 5;
    if (rang === 11 ) gir = 4;
    if (rang === 10 ) gir = 4;
    if (rang === 9 ) gir = 3;
    if (rang === 8 ) gir = 3;
    if (rang === 7 ) gir = 2;
    if (rang === 6 ) gir = 2;
    if (rang === 5 ) gir = 2;
    if (rang === 4 ) gir = 2;
    if (rang === 3 ) gir = 2;
    if (rang === 2 ) gir = 2;
    if (rang === 1 ) gir = 1;

    this.$el.find('.count').text(gir);

    return this;
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      that.$el.html(tpl());
      return that;
    })
  }

});
