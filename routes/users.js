const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require("../controllers/authController.js");
const { forwardAuthenticated } = require('../config/auth');



router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', auth.postRegister);

router.get('/login', auth.login);
                        // why cant this be deferred to controller?
router.get('/gitlab', passport.authenticate('gitlab', {
                                    scope: ['email'],
                                    passReqToCallback: true
                                }));
router.get('/gitlab/callback', passport.authenticate('gitlab', {
                                    successRedirect: '/dashboard',
                                    failureRedirect: '/users/login',
                                    failureFlash: true
                                }));
                        // and this?
router.get('/amazon', passport.authenticate('amazon', {
                                    scope: ['profile']
                                }));
router.get('/amazon/callback', passport.authenticate('amazon', {
                                    successRedirect: '/dashboard',
                                    failureRedirect: '/users/login',
                                    failureFlash: true
                                }));

router.get('/logout', auth.logout);

module.exports = router;