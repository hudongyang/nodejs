var connect = require('connect'),
    favicon = require('serve-favicon');

connect()
    .use(favicon(__dirname + '/public/favicon.ico'))
    .use(function(req, res) {
        res.end('hello');
    }).listen(3456);