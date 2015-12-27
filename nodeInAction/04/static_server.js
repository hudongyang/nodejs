var http    = require('http'),
    parse   = require('url').parse,
    join    = require('path').join,
    fs      = require('fs'),
    root    = __dirname,

    server = http.createServer(function(req, res) {
        var url = parse(req.url),
            path = join(root, url.pathname);


        fs.stat(path, function(err, stat) {
            if(err) {
                if('ENOENT' == err.code) {
                    res.statusCode = 404;
                    res.end('not found\n');
                } else {
                    res.statusCode = 500;
                    res.end('Internal server error\n');
                }
            } else {
                res.setHeader('Content-Length', stat.size);
                var stream = fs.createReadStream(path);
                stream.pipe(res);

                stream.on('error', function(err) {
                    res.statusCode = 500;
                    res.end('Internal server error\n');
                });
            }
        });
        
        /*stream.on('data', function(chunk) {
            res.write(chunk);
        });        

        stream.on('end', function() {
            res.end();
        });*/

    }).listen(3000);