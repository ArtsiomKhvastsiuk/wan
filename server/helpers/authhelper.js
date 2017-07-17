const passport = require('passport');

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
        debugger;
    })(req, res, next);
};

