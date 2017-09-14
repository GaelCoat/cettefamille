"use strict";

var q = require('q');
var _ = require('underscore');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var auth = require('../auth');


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

  app.route('/*').get(function(req, res) {

    res.render('index');
  });


  return app;
}

