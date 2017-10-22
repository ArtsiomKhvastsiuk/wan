const express = require('express');
const passport = require('passport');
const parser = require('rss-parser');

const controller = require('../controllers/auth');
const authhelper = require('../helpers/authhelper');

const User = require('../models/user');

const api = express.Router();

/* Local Auth */
api.post('/signup', controller.register);
api.post('/signin', authhelper.authenticate('local'), (req, res) => {
    res.json({result: true});
});


/* Google Auth */
api.get('/auth/google', authhelper.authenticate('google', {scope: ['profile', 'email']}));
api.get('/auth/google/callback', authhelper.oauthCallbackAuthenticate('google'), (req, res) => {
    res.redirect('/');
});

api.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({status: true});
    } else {
        res.json({status: false});
    }
});

api.get('/profile', (req, res) => {
    if (req.user) {
        res.json({status: true, user: req.user});
    } else {
        res.json({status: false})
    }
});

api.post('/check-username', (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.json({result: false});
    }
    User.findOne({username}, null, {collation: {locale: 'en', strength: 2}})
        .then((user) => {
            if (user) {
                return res.json({result: false});
            } else {
                return res.json({result: true});
            }
        })
        .catch((error) => {
            return res.json({error: error});
        })
});

api.get('/parse-habr', (req, res) => {
    parser.parseURL('https://habrahabr.ru/rss/interesting/', (err, parsed) => {
        if (err) {
            return res.json({status: false, message: err.message});
        }
        return res.json({status: true, parsed: parsed.feed});
    });
});

api.get('/logout', (req, res) => {
    req.logout();
    res.json({status: true});
});


module.exports = api;