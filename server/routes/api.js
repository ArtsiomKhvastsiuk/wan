const express = require('express');
const passport = require('passport');

const controller = require('../controllers/auth');

const User = require('../models/user');

const api = express.Router();

const requireLocal = (name, options) => (req, res, next) => {
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

api.post('/signup', controller.register);
api.post('/signin', requireLocal('local'), (req, res) => {
    res.json({ result: true });
});

api.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({status: true});
    } else{
        res.json({status: false});
    }
});

/*function checkAuthentication (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else{
        next();
    }
}*/

module.exports = api;