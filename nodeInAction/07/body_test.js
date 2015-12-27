var connect = require('connect'),
    bodyParser = require('body-parser'),
    getRawBody = require('raw-body');

connect()
    .use(function(req, res, next) {
        getRawBody(req, {
            length: req.headers['content-length'],
            limit: '300k',
            encoding: 'utf-8'
        }, function(err, string) {
            if(err) return next(err);
            req.text = string;
            next();
        });
    })
    // .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(function(req, res) {
        console.log(req.body);
        res.end('hi \n');
    }).listen(3000);

