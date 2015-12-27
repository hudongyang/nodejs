var http = require('http');

http.createServer(function(req, res) {
    req.setEncoding('utf-8');
    req.on('data', function(chunk) {
        console.log(chunk);
    });

    req.on('end', function() {
        console.log('done');
        res.end('done\n');
    });

    /*var url = 'http://www.google.com'
    var body = 'to <a href="'+url+'">Google</a>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Location', url);
    res.setHeader('Content-Length', body.length);
    res.statusCode = 302;
    res.end(body);*/
}).listen(3000);