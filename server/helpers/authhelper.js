const passport = require('passport');
const User = require('../models/user');

exports.authenticate = (name, options) => (req, res, next) => {
    passport.authenticate(name, options, (error, user, info) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            if (!info) {
                info = {};
            }
            if (info.result === undefined) {
                info.result = false;
            }
            return res.json(info);
        } else {
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        }
    })(req, res, next);
};

exports.oauthCallbackAuthenticate = (name, options) => (req, res, next) => {
    passport.authenticate(name, options, (error, user, info) => {
        "use strict";
        if (error) {
            return next(error);
        }
        if (!user) {
            const username = info.google.name;
            const newUser = new User(Object.assign({username}, info));
            newUser.save()
                .then((user) => {
                    req.logIn(user, function () {
                        next();
                    });
                })
                .catch((error) => {
                    return next(error);
                })
        } else {
            req.logIn(user, function() {
                next();
            });
        }

    })(req, res, next);
};

