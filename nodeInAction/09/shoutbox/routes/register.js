var express = require('express'),
    router = express.Router(),
    User = require('../lib/user');

router
    .get('/register', function(req, res) {
        res.render('register', {title: 'Register'});
    })
    .post('/register', function(req, res, next) {
        var name = req.body.name;

        User.getByName(name, function(err, user) {
            if(err) return next(err);

            if(user.id) {
                res.error('Username already token!');
                res.redirect('back');
            } else {
                user = new User({
                    name: name,
                    pass: req.body.pass
                });

                user.save(function(err) {
                    if(err) return next(err);

                    req.session.uid = user.id;
                    res.redirect('/');
                });
            }
        });
    });    

module.exports = router;    