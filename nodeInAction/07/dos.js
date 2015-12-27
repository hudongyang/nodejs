var http = require('http'),
    req = http.request({
        method: 'POST',
        port: 3000,
        headers: {
            'Content-Type': 'application/json'
        }
    });


req.write('[');
var n = 30;
while(n--) {
    req.write('"foo",');
}

req.write('"bar"]');
req.end();