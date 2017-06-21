const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/api');

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    /*res.header("Access-Control-Allow-Credentials", "true");*/
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        // обрабатывать дальше
        next();
    }
});

app.use('/api', api);


