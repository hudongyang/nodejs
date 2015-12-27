var db = {
    users: [
        {name: 'xiaofei'},
        {name: 'xiaocai'},
        {name: 'xiaoyang'}
    ]
};

function users(req, res, next) {
    console.log(req.url);
    var match = req.url.match(/^\/users\/(.+)/);

    if(match) {
        var user = db.users[match[1]];
        if(user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        } else {
            var err = new Error('user not found');
            err.notFound = true;
            next(err);
        }
    } else {
        next();
    }
}


module.exports = users;