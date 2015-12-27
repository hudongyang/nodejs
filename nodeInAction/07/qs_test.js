var connect = require('connect'),
    parse = require('url').parse,
    qs = require('qs');

connect()
    .use(function(req, res, next) {
        var query = parse(req.url).query;
        req.query = qs.parse(query);
        next();
    })
    .use(function(req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.query));
    }).listen(3000);