const express = require('express');
const passport = require('passport');

const controller = require('../controllers/auth');

const api = express.Router();

const requireLocal = passport.authenticate('local');

api.post('/signup', controller.register);

module.exports = api;
