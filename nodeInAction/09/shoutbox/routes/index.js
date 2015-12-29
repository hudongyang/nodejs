exports.notfound = function(req, res, next) {
    res.status(404).format({
        html: function() {
            res.render('404');
        },
        json: function() {
            res.send({message: 'Resouce not found'});
        },
        text: function() {
            res.send('Resouce not found');
        }
    });
};
