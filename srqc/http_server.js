var http = require('http');

http.createServer(function(req, res) {

    var cookies = parseCookie(req.headers.cookie);

    console.log(cookies);

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.end('hello world!\n')
}).listen(1227, '127.0.0.1');

var parseCookie = function(cookie) {
    var cookies = {};
    if(cookie) {
        var list = cookie.split(';');
        list.forEach(function(c) {
            var pair = c.split('=');
            cookies[pair[0].trim()] = pair[1];
        });
    }

    return cookies;
};

console.log('server start on 1227');