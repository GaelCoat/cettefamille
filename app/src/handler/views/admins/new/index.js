var tpl = require("pug-loader!./tpl.pug");
var Admin = require('../../../../models/user');

module.exports = Marionette.View.extend({

  className: 'signin',

  events: {
    'click #create': 'create',
    'click #update': 'update'
  },

  initialize: function(params) {

    if (params.admin) this.admin = params.admin;
  },

  create: function(e) {

    var that = this;

    e.preventDefault();
    e.stopPropagation();

    var username = this.$el.find('#username').val();
    var mail = this.$el.find('#mail').val();
    var password = this.$el.find('#password').val();

    return q.fcall(function() {

      var defer = q.defer();

      $.ajax({
        method: 'POST',
        url: '/user',
        data: {
          username: username,
          mail: mail,
          password: password
        }
      })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(user) {

      that.$el.find('input').val('');
      var btn = that.$el.find('#create');

      return that.success(btn);
    })
    .catch(function(err) {

      that.$el.find('.error').show();
    })
  },

  update: function(e) {

    var that = this;

    e.preventDefault();
    e.stopPropagation();

    var username = this.$el.find('#username').val();
    var mail = this.$el.find('#mail').val();
    var password = this.$el.find('#password').val();
    var newPassword = this.$el.find('#password-new').val();

    return q.fcall(function() {

      var defer = q.defer();

      var data = {
        username: username,
        mail: mail,
        password: password,
        newPassword: newPassword
      }

      that.admin.save(data, {
        success: defer.resolve,
        error: defer.reject
      });

      return defer.promise;

    })
    .then(function(user) {

      that.$el.find('input').val('');
      var btn = that.$el.find('#update');

      return that.success(btn);
    })
    .catch(function(err) {

      that.$el.find('.error').show();
    })
  },

  success: function(btn) {

    btn.addClass('success').find('span').text('Succès')

    _.delay(function() {

      btn.removeClass('success').find('span').text('Confirmer');
    }, 2500);

    return this;
  },

  fetchAdmin: function() {

    var that = this;

    return q.fcall(function() {

      var defer = q.defer();
      $.ajax({ method: "GET", url: "/user/"+that.admin })
      .done(defer.resolve)
      .fail(defer.reject);
      return defer.promise;
    })
    .then(function(model) {

      that.admin = new Admin(model);
      return that;
    })
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      if (that.admin) return that.fetchAdmin();
      return that;
    })
    .then(function() {

      var html = tpl();
      var template = _.template(html);
      that.$el.html(template({
        admin: that.admin
      }));

      return that;
    })
  }

});
