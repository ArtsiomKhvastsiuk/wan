const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username}, (error, user) => {
            if (error) {
                done(error);
            }

            if (!user) {
                done(null, false, {message: "Incorrect username"});
            }

            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password'});
            }

            return done(null, user);
        });

    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            return done(null, user);
        })
        .catch((error) => {
            return done(error);
        })
});