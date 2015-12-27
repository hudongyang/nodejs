var parse = require('url').parse;

module.exports = function(obj) {
    return function(req, res, next) {
        if(!obj[req.method]) {
            next();
            return;
        }

        var routes = obj[req.method],
            url = parse(req.url),
            paths = Object.keys(routes);

        for(var i=0; i<paths.length; i++) {
            var path = paths[i],
                fn = routes[path];

            path = path
                .replace(/\//g, '\\/')
                .replace(/:(\w+)/g, '([^\\/]+)');

            var re = new RegExp('^' + path + '$'),
                captures = url.pathname.match(re);

            if(captures) {
                var args = [req, res].concat(captures.slice(1));
                fn.apply(null, args);

                return;
            }
        }

        next();
    };
};