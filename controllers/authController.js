const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/User');
const saltRounds = 10;

exports.readFriends = async function (req, res) {
    let us = await User.find({});
    res.render('displayUsers', {
        users: us,
        title: 'Show friends'
    });
};

exports.register = function (req, res) {
    res.render('register', {
            title: 'Register'
    });
};

exports.postRegister = async function (req, res) {
    const { userid, email } = req.body;
    let errors = [];

    if (!userid || !email) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            userid,
            email
        });
    }

    let user = await User.findOne({ email: email });
    if (user) {
        errors.push({ msg: 'User already exists' });
        res.render('register', {
            errors,
            userid,
            email
        });
    }

    const newUser = new User({name: userid, email: email});
    await newUser.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
};

exports.login = function (req, res) {
    res.render('login', {title: 'Login With'})
};

exports.logout = function (req, res) {
    req.logout();                              // passport
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
};


exports.github = function () {
    console.log("outg");
    passport.authenticate('github',
      {
        scope: ['profile']
      });
};
exports.github_callback = function (req, res, next) {
    passport.authenticate('github', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

/*
exports.amazon = async function () {
    console.log("outa");
    await passport.authenticate('amazon');
    console.log('outa ret');
};

exports.amazon_callback = function (req, res, next) {
    passport.authenticate('amazon', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};
*/