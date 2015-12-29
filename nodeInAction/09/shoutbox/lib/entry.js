var redis = require('redis'),
    db = redis.createClient();

var Entry = function(obj) {
    for(var key in obj) {
        this[key] = obj[key];
    }
};    

Entry.prototype.save = function(fn) {
    var entryJson = JSON.stringify(this);

    db.lpush('entries', entryJson, function(err) {
        if(err) return fn(err);

        fn();
    });
};

Entry.getRange = function(from, to, fn) {
    db.lrange('entries', from, to, function(err, items) {
        if(err) return fn(err);

        var entries = items.map(function(item) {
            return JSON.parse(item);
        });

        fn(null, entries);
    });
};

Entry.count = function(fn) {
    db.llen('entries', fn);
};

module.exports = Entry;