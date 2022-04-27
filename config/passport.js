const GitlabStrategy = require('passport-gitlab2');
const AmazonStrategy = require('passport-amazon');
const GitHubStrategy = require('passport-github2');
const keys = require('./keys');
// Load User model
const User = require('../models/User');

module.exports = function (passport) {

    passport.use( new GitHubStrategy( {
            clientID: keys.github.clientID,
            clientSecret: keys.github.clientSecret,
            callbackURL: '/users/github/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            User.findOne({name: profile._json.login})
                .then(function (currentUser) {
                    if(currentUser) {
                        return done(null, currentUser);
                    } else {
                        new User({
                            name: profile.username,
                            email: "abc"
                        }).save()
                            .then(function (newUser) {
                            return done(null, newUser);
                        });
                    }
                });
            }
        )
    );

    // passport.use(new AmazonStrategy( {
    //         clientID: keys.amazon.clientID,
    //         clientSecret: keys.amazon.clientSecret,
    //         callbackURL: '/users/amazon/callback'
    //     },
    //     function (accessToken, refreshToken, profile, done) {
    //         User.findOne({email: profile._json.email})
    //             .then(function (currentUser) {
    //                 if(currentUser) {
    //                     return done(null, currentUser);
    //                 } else {
    //                     new User({
    //                         name: profile.displayName,
    //                         email: profile._json.email
    //                     }).save()
    //                     .then(function (newUser) {
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });
    //         }
    //     )
    // );

    // create cookie
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // find user from cookie received from server
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function (user) {
            done(null, user);
        });
    });
};