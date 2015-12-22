var express = require('express');
var app = express();

app.use('/static', express.static(__dirname +  '/public'));

app.all('/users', function(req, res, next) {
    console.log('Hi!');
    next();
});

app.get('/users', function(req, res, next) {
    console.log('hello users');
    next();
}, function(req, res) {
    res.send('Hello, world!');
});

var birds = require('./birds');
app.use('/birds', birds);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});