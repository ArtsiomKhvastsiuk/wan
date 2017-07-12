const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username}, (error, user) => {
            if (error) {
                return done(error);
            }

            if (!user) {
                return done(null, false, {message: "Incorrect username", errno: 2});
            }

            user.comparePassword(password, (error, result) => {
                if (error) {
                    return done(error);
                }
                if (!result) {
                    return done(null, false, {message: 'Incorrect password', errno: 3});
                }
                return done(null, user);
            });

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