var http = require('http'),
    formidable = require('formidable');

http.createServer(function(req, res) {

    switch(req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
}).listen(3000);

function show(req, res) {　//提供带有文件上传控件的HTML表单
  var html = ''
    + '<form method="post" action="/" enctype="multipart/form-data">'
    + '<p><input type="text" name="name" /></p>'
    + '<p><input type="file" name="file" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>';
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

function upload(req, res) {
    if(!isFormData(req)) {
        req.statusCode = 400;
        res.end('bad request expecting multipart/form-data');
        return;
    }

    var form = new formidable.IncomingForm();

    form.on('field', function(field, value) {
        console.log(field, value);
    });

    form.on('file', function(name, file) {
        console.log(name, file);
    });

    form.on('end', function() {
        res.end('unload completed!');
    });

    form.parse(req);
} 

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}