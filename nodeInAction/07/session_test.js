var connect = require('connect'),
    session = require('express-session');

connect()
    .use(session({secret: 'keyboard cat'}))    
    .use(function(req, res, next) {
        var sess = req.session;

        if(sess.views) {
            sess.views++;
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>' + sess.views + '</p>');
            res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
            res.write('<p>httpOnly: ' + sess.cookie.httpOnly + '</p>');
            res.write('<p>path: ' + sess.cookie.path + '</p>');
            res.write('<p>domain: ' + sess.cookie.domain + '</p>');
            res.write('<p>secure: ' + sess.cookie.secure + '</p>');
            res.end();
        } else {
            sess.views = 1;
            res.end('welcome')
        }
    }).listen(3000);