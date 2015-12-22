var http    = require('http'),
    fs      = require('fs'),
    path    = require('path'),
    mime    = require('mime'),
    fileCatch   = {};


var server = http.createServer(function(req, res) {
    var filePath = false;
    if(req.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + req.url;
    }

    var absPath = './' + filePath;

    serverStatic(res, fileCatch, absPath);
});

server.listen(3000, function() {
    console.log('server listening on port 3000');
});

// 给它提供一个已经定义好的HTTP服务器，这样它就能跟HTTP服务器共享同一个TCP/IP端口
var chatServer = require('./lib/chat_server');
chatServer.listen(server);


/**
 * 静态文件服务器
 */

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('error 404, page not found');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {
        'Content-Type': mime.lookup(path.basename(filePath))
    });

    response.end(fileContents);
}

function serverStatic(response, fileCatch, absPath) {
    /*if(fileCatch[absPath]) {
        sendFile(response, absPath, fileCatch[absPath]);
        return;
    }*/

    fs.exists(absPath, function(exists) {
        // 无此文件，404
        if(!exists) {
            send404(response);
            return;
        }

        // 有文件，从硬盘读取
        fs.readFile(absPath, function(err, data) {
            // 读取报错，404
            if(err) {
                send404(response);
                return;
            }

            fileCatch[absPath] = data;
            sendFile(response, absPath, data);
        });
    });

}