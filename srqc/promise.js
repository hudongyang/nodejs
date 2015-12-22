const EventEmitter = require('events');
const util = require('util');

var Promise = function() {
    EventEmitter.call(this);
};

util.inherits(Promise, EventEmitter);

Promise.prototype.then = function(success, error, progress) {
    if(typeof success === 'function') {
        this.once('success', success);
    }

    if(typeof error == 'function') {
        this.once('error', error);
    }

    if(typeof progress == 'function') {
        this.once('progress', progress);
    }

    return this;
};

var Deferred = function() {
    this.state = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj) {
    this.state = 'fulfilled';
    this.promise.emit('success', obj);
};

Deferred.prototype.reject = function(error) {
    this.state = 'failed';
    this.promise.emit('error', error);
};

Deferred.prototype.progress = function(data) {
    this.promise.emit('progress');
};