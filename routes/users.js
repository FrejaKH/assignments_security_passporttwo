const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const saltRounds = 10;
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Register Page
router.get('/register', forwardAuthenticated, function (req, res) { res.render('register', {
        title: 'Demoing PassportJS',
        subtitle: 'Inspired by Traversy'
    });
});

// Register
router.post('/register', function (req, res) {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then( function (user) {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
              } else {
                  const newUser = new User({
                      name,
                      email,
                      password
                  });

                  bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                          .save()
                          .then(user => {
                              req.flash(
                                  'success_msg',
                                  'You are now registered and can log in'
                              );
                              res.redirect('/users/login');
                          })
                          .catch(err => console.log(err));
                  });
              }
        });
    }
});

// Login Page
router.get('/login', forwardAuthenticated, function (req, res) { res.render('login', {
        title: 'Demoing PassportJS',
        subtitle: 'Inspired by Traversy'
    });
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;