var http = require('http'),
    qs = require('querystring'),
    items = [],

    server = http.createServer(function(req, res) {
        if('/' != req.url) return notFound(res);

        switch(req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);
        }
    }).listen(3000);

function show(res) {  
    var html = '<html><head><title>Todo List</title></head><body>'         
            + '<h1>Todo List</h1>'//对简单的程序而言，用嵌入的HTML取代模板引擎一样好用         
            + '<ul>'         
            + items.map(function(item){              
                return '<li>' + item + '</li>'            
              }).join('')         
            + '</ul>'         
            + '<form method="post" action="/">'         
            + '<p><input type="text" name="item" /></p>'         
            + '<p><input type="text" name="name" /></p>'         
            + '<p><input type="submit" value="Add Item" /></p>'         
            + '</form></body></html>';  

    res.setHeader('Content-Type', 'text/html');  
    res.setHeader('Content-Length', Buffer.byteLength(html));  
    res.end(html);
}     

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('not found');
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('bad request');
}


function add(req, res) {
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', function() {
        console.log(body);
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}

