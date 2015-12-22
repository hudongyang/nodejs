var http = require('http');
var options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/users',
    method: 'post'
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    res.on('end', function() {
        console.log('No more data in response.')
    })
});

req.end();