var connect = require('connect'),
    auth = require('basic-auth');

connect()
    .use(function(req, res) {

        var user = auth(req);

        console.log(user);

        res.end('hello');

    }).listen(3000);