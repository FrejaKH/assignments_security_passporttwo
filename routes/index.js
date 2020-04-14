const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// front page
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Demoing PassportJS',
        subtitle: 'Inspired by Traversy'
    });
});
/*
// Welcome Page
router.get('/', forwardAuthenticated, function (req, res) {
    res.render('index');
});
*/
// Dashboard
router.get('/dashboard', ensureAuthenticated, function (req, res) {
    res.render('dashboard', {
        title: 'Demoing PassportJS',
        subtitle: 'Here\'s What We Do:',
        user: req.user
    });
});

module.exports = router;
