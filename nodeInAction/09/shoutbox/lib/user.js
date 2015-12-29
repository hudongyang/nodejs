var redis = require('redis'),
    bcrypt = require('bcrypt'),
    db = redis.createClient();

module.exports = User;

function User(obj) {
    for(var key in obj) {
        this[key] = obj[key];
    }
}

User.prototype.hashPassword = function(fn) {
    var user = this;
    bcrypt.genSalt(12, function(err, salt) {
        if(err) return fn(err);

        user.salt = salt;
        bcrypt.hash(user.pass, function(err, hash) {
            if(err) return fn(err);

            user.pass = hash;
            fn();
        });
    });
};

User.prototype.save = function(fn) {
    if(this.id) return this.update(fn); 

    var user = this;
    db.incr('user:ids', function(err, id) {
        if(err) return fn(err);

        user.id = id;
        user.update(fn);
       /* user.hashPassword(function(err) {
            if(err) return fn(err);

            user.update(fn);
        });*/
    });
};

User.prototype.update = function(fn) {
    var user = this,
        id = user.id;

    db.set('user:id:' + user.name, id, function(err) {
        if(err) return fn(err);

        db.hmset('user:' + id, user, function(err) {
            fn(err);
        });
    });

};

User.prototype.toJSON = function() {
    return {
        id: this.id,
        name: this.name
    }
};

User.authenticate = function(name, pass, fn) {
    User.getByName(name, function(err, user) {
        if(err) return fn(err);
        if(!user.id) return fn();

        if(pass == user.pass) return fn(null, user);
    });
};

User.getByName = function(name, fn) {
    User.getId(name, function(err, id) {
        if(err) return fn(err);

        User.get(id, fn);
    });
};

User.getId = function(name, fn) {
    db.get('user:id:' + name, fn);
};

User.get = function(id, fn) {
    db.hgetall('user:' + id, function(err, user) {
        if(err) return fn(err);

        fn(null, new User(user));
    });
};

/*var tobi = new User({
    name: 'Tobi',
    pass: 'in a ferret',
    age: '2'
});

tobi.save(function(err) {
    if(err) throw err;
    console.log('user id %d', tobi.id);
});*/