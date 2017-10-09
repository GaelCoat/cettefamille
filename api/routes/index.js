"use strict";

var q = require('q');
var _ = require('underscore');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var User = require('../services/user');

var check = function() {

  return q.fcall(function() {

    return User.model.count().exec();
  })
  .then(function(count) {

    if (count > 0) return count;
    return User.create({
      mail: 'admin@cettefamille.fr',
      username: 'admin',
      password: 'admin'
    })
  });
};


module.exports = function(app) {

  // --------------------------------------------------
  // Home
  // --------------------------------------------------
  app.route('/login').get(function(req, res) {

    res.render('login');
  })
  .post(passport.authenticate('login', {
    successRedirect: '/handling',
    failureRedirect: '/login',
    failureFlash : true
  }));

  // --------------------------------------------------
  // La liste des routes spécifiques
  // --------------------------------------------------
  app.use('/auth', require('./auth'));
  app.use('/handling', require('./handling'));
  app.use('/family', require('./family'));
  app.use('/elderly', require('./elderly'));
  app.use('/blog', require('./blog'));
  app.use('/testimony', require('./testimony'));
  app.use('/message', require('./message'));
  app.use('/reset', require('./reset'));
  app.use('/user', require('./user'));
  app.use('/media', require('./media'));

  app.route('/img/uploads/:id').get(function(req, res, next) {

    var options = {
      root: 'app/build/img/uploads/',
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    var fileName = req.params.id;
    res.sendFile(fileName, options, function (err) {

      if (err) next(err);
      else console.log('Sent:', fileName);
    });

  });

  app.route('/*').get(function(req, res) {

    res.render('index');
  });


  // On regarde si il y a au moins un compte de créé
  check();
  return app;
}

