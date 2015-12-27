var express = require('express');

express()
    .get('/', function(req, res) {
        res.send('hello');
    }).listen(3000);