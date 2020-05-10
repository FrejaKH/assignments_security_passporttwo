const OpenIDStrategy = require('passport-openid').Strategy;
// Load User model
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new OpenIDStrategy(
            {
                returnURL: 'http://www.example.com/auth/openid/return',
                realm: 'http://www.example.com/'
            },
            function (identifier, done) {
                User.findOrCreate({ openId: identifier }, function(err, user) {
                    done(err, user);
                });
            }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
