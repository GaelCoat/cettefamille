var q = require('q');
var _ = require('underscore');
var config = require('config');

// Les models
var model = require('../models/user');

// Les services
var core = new require('./core')();

var service = _.extend(core, {

  model: model,

  definePwd: function(id, data) {

    var that = this;

    if (data['password'] === data['password-confirm']) return this.model.definePassword(id, data.password);
    return this;
  },

  getList: function(page) {

    var that = this;
    var size = 20;
    var start = (page - 1) * size;

    return q.fcall(function() {

      return that.model
                  .find()
                  .select('mail created username')
                  .limit(size)
                  .skip(start)
                  .sort('-created')
                  .exec()
    })
  },

  getOne: function(id) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).select('mail created username').exec()
    })
  },

  delete: function(id) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).exec();
    })
    .then(function(model) {

      if (model.get('picture')) return Picture.delete(model.get('picture'));
      return that;
    })
    .then(function() {

      return that.remove(id);
    })
  },

  new: function(data) {

    var that = this;

    return q.fcall(function() {

      return that.model.count({mail: data.mail}).exec();
    })
    .then(function(count) {

      if (count > 0) throw new Error('Existing mail');
      return that.create(data);
    })
  },

  modify: function(id, data) {

    var that = this;

    return q.fcall(function() {

      return that.update(id, {username: data.username, mail: data.mail});
    })
    .then(function(model) {

      if (data.password && data.newPassword) return that.changePwd(id, data.password, data.newPassword);
      return model;
    })
  },

  changePwd: function(id, pwd, newPwd) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: id}).exec()
    })
    .then(function(model) {

      return model.comparePassword(pwd);
    })
    .then(function(okay) {

      if (!okay) throw new Error('wrong password');
      return that.model.definePassword(id, newPwd);
    })
  },

});

module.exports = service;
