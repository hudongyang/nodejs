function hello(req, res, next) {
    console.log(req.url);
    if(req.url.match(/^\/hello/)) {
        res.end('hello, world \n');
    } else {
        next();
    }
}

module.exports = hello;