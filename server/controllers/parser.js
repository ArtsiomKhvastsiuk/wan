const http = require('http');

const parseXml = function(options, cb) {
    const req = http.get(options, (res) => {
        res.setEncoding('utf8');
        const bodyChanks = [];
        res.on('data', (chunk) => {
            bodyChanks.push(chunk);
        });
        res.on('end', () => {
            const body = bodyChanks[0];
            cb(null, body);
        });
    });

    req.on('error', (error) => {
        cb(error);
    });
};





