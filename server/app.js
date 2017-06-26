const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const api = require('./routes/api');

mongoose.connect('mongodb://localhost/wan');
mongoose.Promise = Promise;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'secret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        secure: 'false'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    /*res.header("Access-Control-Allow-Credentials", "true");*/
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});

app.use('/api', api);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});

