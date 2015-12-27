var connect = require('connect'),
    cookieParser = require('cookie-parser');


connect()
    .use(cookieParser('tobi is a cool ferret'))
    .use(function(req, res) {
        console.log(req.cookies);
        console.log(req.signedCookies);

        res.setHeader('Set-Cookie', 'foo=bar;');
        res.setHeader('Set-Cookie', 'tobi=ferret; Expires=Tue, 08 Jun 2021 10:18:14 GMT');
        res.end('hello');
    }).listen(3000);