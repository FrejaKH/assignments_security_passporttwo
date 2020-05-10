const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/User');
const saltRounds = 10;

/*
 * the functions register, postRegister, 
 * are removed here for presentation overview.
 * See them in the previous node_passport_login incarnation.
 */
 
exports.login = function (req, res) {
    res.render('loginOI', {
        title: 'Demoing PassportJS',
        subtitle: 'with OpenID'
    });
};

exports.openid = function (req, res, next) {
    passport.authenticate('openid');
};

exports.postLogin = function (req, res, next) {
    passport.authenticate('openid', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};
