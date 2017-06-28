const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use(new LocalStrategy({
        function(username, password, done) {
            user.findOne({username}, (error, done) => {
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
}));