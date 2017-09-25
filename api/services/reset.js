var q = require('q');
var _ = require('underscore');
var config = require('config');

// Les models
var model = require('../models/reset');
var userModel = require('../models/user');

// Les services
var core = new require('./core')();
var User = require('./user');

var Mailjet = require('node-mailjet').connect(config.mail.api, config.mail.secret);

var service = _.extend(core, {

  model: model,

  sendMail: function(model, mail) {

    var url = 'reset/define?uid='+model.get('user')+'&rid='+model.get('_id');

    return q.fcall(function() {

      var data = {
        FromEmail: 'gael@dgsport-agency.com',
        FromName: 'Cette Famille',
        Subject: 'Réinitialisation de votre mot de passe',
        'Text-part': 'Pour redéfinir votre mot de passe cliquer sur le lien ci-dessous :\r\rhttp://localhost:6969/'+url,
        Recipients: [{ 'Email': mail }],
      };

      return Mailjet.post('send').request(data);
    })
    .catch(function(err) {

      console.log(err);
    })
  },

  check: function(data) {

    var that = this;
    var mail = data.mail;

    return q.fcall(function() {

      return userModel.findOne({mail: mail}).exec();
    })
    .then(function(user) {

      if (!user) return false;

      return [
        user.get('mail'),
        that.create({user: user.get('_id')})
      ]
    })
    .all()
    .spread(function(mail, model) {

      if (!model) return false;
      return that.sendMail(model, mail);
    })
  },

  define: function(uid, rid, data) {

    var that = this;

    return q.fcall(function() {

      return that.model.findOne({_id: rid, user: uid}).exec();
    })
    .then(function(model) {

      if (model) return User.definePwd(uid, data);
      return that;
    })

  },


});

module.exports = service;
