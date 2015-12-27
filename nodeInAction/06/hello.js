var connect = require('connect'),
    logger = require('./logger'),
    router = require('./router'),
    app = connect();

app .use(logger(':method :url'))
    .use(router(require('./routes/user')))
    .use('/admin', admin)
    .use(hello)
    .use(errorHandler())
    .listen(3000);

/*function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}*/

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello, world\n');
}

function admin(req, res, next) {
    console.log('admin===', req.url);
    switch(req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'text/json');
            res.end(JSON.stringify(['hudy', 'xiaocai', 'xiaoyifei']));
            break;
    }
}

function errorHandler() {
    var env = process.env.NODE_ENV || 'development';

    return function(err, req, res, next) {
        res.statusCode = 500;

        switch(env) {
            case 'development':
                console.log(err, JSON.stringify(err));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end('server error');
        }
    };
}