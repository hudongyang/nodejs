var express = require('express'),
    router = express.Router(),
    Entry = require('../lib/entry'),
    page = require('../lib/middleware/page');
    validate = require('../lib/middleware/validate');

router
    .get('/:page?', page(Entry.count, 2), function(req, res, next) {
        var page = req.page;
        Entry.getRange(page.from, page.to, function(err, entries) {
            if(err) return next(err);

            res.render('entries', {
                title: 'entries',
                entries: entries
            });
        });
    })

    .get('/post', function(req, res) {
        res.render('post', {title: 'Post'});
    })

    .post('/post', 
        validate.required('entry[title]'),
        validate.lengthAbove('entry[body]', 4),
        function(req, res) {
            var title = req.body.title,
                body = req.body.body

            var entry = new Entry({
                username: res.locals.user.name,
                title: title,
                body: body
            });

            entry.save(function(err) {
                if(err) return next(err);
                res.redirect('/');
            });
    });

module.exports = router;    