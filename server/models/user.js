const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = require('mongoose').Schema;
const ValidationError = mongoose.Error.ValidationError;

const UserSchema = new Schema({
        username: {
            type: String,
            index: true,
            required: true,
            unique: true,
            match: /^[\w@$!%*#?&А-Яа-яЁё\s]{2,32}$/, /*/^[\w@$!%*#?&А-Яа-яЁё]+\s?[\w@$!%*#?&А-Яа-яЁё]+$/*/
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            sparse: true,
            unique: true,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        google: {
            id: String,
            name: String,
            emails: Array,
        }
    },
    {
        timestamp: true
    });

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    if (!this.password.match(/^[\w@$!,.%*#?&]{6,32}$/)) {
        const err = new ValidationError();
        err.errors.password = {message: "Password is not valid", errno:3};
        next(err);
        return;
    }

    const saltRounds = 10;
    bcrypt.hash(this.password, saltRounds, (error, hash) => {
        if (error) return next(error);
        this.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (error, result) => {
        if (error) {
            return cb(error);
        }
        cb(null, result);
    });
};


module.exports = mongoose.model("User", UserSchema);