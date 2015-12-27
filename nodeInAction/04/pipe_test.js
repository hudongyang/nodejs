var fs          = require('fs'),
    readStream  = fs.createReadStream('static_server.js'),
    writeStream = fs.createWriteStream('copy.txt');

readStream.pipe(writeStream);