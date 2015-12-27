var connect = require('connect'),
    vhost = require('vhost');
    
connect()
    .use(vhost('expressjs.org', connect()))
    .listen(3000);