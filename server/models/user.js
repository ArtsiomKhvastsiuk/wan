const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
        username: {
            type: String,
            index: true,
            required: true,
            unique: true,
            match: /^[\w@$!%*#?&]{6,32}$/
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            index: true,
            required: true,
            unique: true,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    },
    {
        timestamp: true
    });

UserSchema.methods.validPassword = function (password) {
    return this.password === password;
};

module.exports = mongoose.model("User", UserSchema);