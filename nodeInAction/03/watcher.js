var events = require('events'),
    util = require('util'),
    fs = require('fs');

function Watcher(watchDir, processDir) {
    this.watchDir = watchDir;
    this.processDir = processDir;

    this.on('process', function(file) {
        var watchFile = this.watchDir + '/' + file,
            processFile = this.processDir + '/' + file.toLowerCase();

        fs.rename(watchFile, processFile, function(err) {
            // throw err;
        });
    });
}

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.watch = function() {
    var watcher = this;

    fs.readdir(this.watchDir, function(err, files) {
        if(err) throw err;

        for(var index in files) {
            watcher.emit('process', files[index]);
        }
    });
};

Watcher.prototype.start = function() {
    var watcher = this;
    fs.watchFile(watchDir, function() {
        watcher.watch();
    });
};

var watchDir = './watch',
    processDir = './done';

new Watcher(watchDir, processDir).start();