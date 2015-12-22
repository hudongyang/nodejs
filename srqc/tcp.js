var net = require('net');

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        socket.write('你好');
    });

    socket.on('end', function() {
        console.log('断开连接');
    });

    socket.write('hello node tcp');
});

server.listen(8124, function() {
    console.log('server bound');
});