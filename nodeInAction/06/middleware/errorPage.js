module.exports = function(err, req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end('internal server error');
};