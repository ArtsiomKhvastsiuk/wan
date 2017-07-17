const express = require('express');
const passport = require('passport');

const controller = require('../controllers/auth');
const authhelper = require('../helpers/authhelper');

const User = require('../models/user');

const api = express.Router();

/* Local Auth */
api.post('/signup', controller.register);
api.post('/signin', authhelper.authenticate('local'), (req, res) => {
    res.json({ result: true });
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


module.exports = api;