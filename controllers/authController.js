const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('../models/User');
const saltRounds = 10;

exports.register = function (req, res) {
    res.render('register', {
            title: 'Register'
    });
};

exports.postRegister = function (req, res) {
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
    } else {
        User.findOne({ email: email }).then( function (user) {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    userid,
                    email
                });
              } else {
                  const newUser = new User({
                      userid,
                      email
                  });
                  newUser.save()
                      .then( function(user) {
                          req.flash(
                              'success_msg',
                              'You are now registered and can log in'
                          );
                          res.redirect('/users/login');
                      })
                      .catch(err => console.log(err));
              }
        });
    }
};

exports.login = function (req, res) {
    res.render('login', {title: 'Login With'})
};

exports.logout = function (req, res) {
    req.logout();                              // passport
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
};

/*
exports.gitlab = function () {
    console.log("outg");
    passport.authenticate('gitlab',
      {
        scope: ['profile']
      });
};
exports.gitlab_callback = function (req, res, next) {
    passport.authenticate('gitlab', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};
*/
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