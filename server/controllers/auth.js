const User = require('../models/user');

exports.register = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || !password || !email) {
        return res.json({message: "The required parameters are missing."});
    }

    User.findOne({username}, null, {collation: {locale: 'en', strength: 2}})
        .then((existingUser) => {
            if (existingUser) {
                return res.json({message: "This login already exists.", errno: 1});
            }

            const user = new User({
                username: username,
                password: password,
                email: email
            });

            user.save()
                .then(() => {
                    return res.json({result: true})
                })
                .catch((error) => {
                    if (error.name === "ValidationError") {
                        if (error.errors.username) {
                            return res.json({message: "This login is not valid", errno: 2});
                        }
                        if (error.errors.password) {
                            return res.json({message: "This password is not valid", errno: 3});
                        }
                        if (error.errors.email) {
                            return res.json({message: "This email is not valid", errno: 4});
                        }
                    }
                    return next(error);
                });

        })
        .catch((error) => {
            return next(error);
        })

};
