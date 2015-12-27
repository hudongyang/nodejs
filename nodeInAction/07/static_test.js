var connect = require('connect'),
    compression = require('compression'),
    serveIndex = require('serve-index'),
    static = require('serve-static');

connect()
    .use(compression())
    .use(serveIndex('public'))
    .use(static('public'))
    .listen(3000);