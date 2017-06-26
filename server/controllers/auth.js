const User = require('../models/user');

exports.register = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || !password || !email) {
        return res.status(400).json({error: "The required parameters are missing."});
    }

    User.findOne({username}, null, {collation: {location: 'en', strength: 2}})
        .then((existingUser) => {
            if (existingUser) {
                return res.status(400).json({error: "This login already exists."});
            }

            const user = new User({
                username: username,
                password: password,
                email: email
            });

            user.save()
                .then(() => {
                    return res.status(200).json({result: "'success'"})
                })
                .catch((error) => {
                    if (error.name === "ValidationError") {
                        return res.status(400).json({error: "This password is not valid"});
                    }

                    return next(error);
                })

        })
        .catch((error) => {
            return next(error);
        })

};
