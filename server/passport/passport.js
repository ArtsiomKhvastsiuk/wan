const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

passport.use(new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: "http://localhost:3001/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({'google_id': profile.id})
        .then((user) => {
            return done(null, user, {
                google: {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails
                }
            });
        })
        .catch((error) => {
            return done(error);
        })
}));

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