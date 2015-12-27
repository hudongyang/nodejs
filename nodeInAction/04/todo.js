var http = require('http'),
    url  = require('url'),
    items = [];

http.createServer(function(req, res) {

    req.setEncoding('utf-8');

    switch(req.method) {
        case 'POST':
            var item = '';
            req.on('data', function(chunk) {
                item += chunk;
            });

            req.on('end', function() {
                items.push(item);
                res.end('done\n');
            });

            break;
        case 'GET':
            var body = items.map(function(item, index) {
                return index + ') ' + item + '\n';
            }).join('');

            res.setHeader('Content-Type', 'text/plain;charset=utf-8');
            res.setHeader('Content-Length', Buffer.byteLength(body));

            res.end(body);

            break;
        case 'DELETE':
            var pathname = url.parse(req.url).pathname;
            var i = parseInt(pathname.slice(1));

            if(isNaN(i)) {
                res.statusCode = 400;
                res.end('invalid item id');
            } else if(!items[i]) {
                res.statusCode = 404;
                res.end('item not found');
            } else {
                items.splice(i, 1);
                res.end('OK\n');
            }

            break;
        case 'PUT':
            var pathname = url.parse(req.url).pathname;
            var i = parseInt(pathname.slice(1));

            if(isNaN(i)) {
                res.statusCode = 400;
                res.end('invalid item id');
            } else if(!items[i]) {
                res.statusCode = 404;
                res.end('item not found');
            } else {
                var item = '';
                req.on('data', function(chunk) {
                    item += chunk;
                });

                req.on('end', function() {
                    items[i] = item;
                    res.end('done\n');
                });
            }
            break;
    }

    

}).listen(3000);