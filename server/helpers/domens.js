exports.options = {
    habrahabr: {
        host: 'htpp://habrahabr.ru',
        port: 80,
        path: '/rss/interesting/',
        method: 'GET',
        headers: {
            'Content-Type': 'text/xml'
        }
    }
};
