var connect = require('connect'),
    morgan = require('morgan');

    connect()
        .use(morgan(':method :url :response-time'))
        .use(function(req, res, next) {
            res.end('hello\n');
        }).listen(3000);