var express = require('express'),
    User = require('../lib/user'),
    router = express.Router();

router
    .get('/login', function(req, res) {
        res.render('login', {title: 'Login'});
    })
    .post('/login', function(req, res, next) {
        var name = req.body.name,
            pass = req.body.pass;

        User.authenticate(name, pass, function(error, user) {
            if(error) return next(error);

            if(user) {
                req.session.uid = user.id;
                res.redirect('/');
            } else {
                res.error('Sorry! invalid credentials.');
                res.redirect('back');
            }
        });            
    })
    .get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect('/');
        });
    });

module.exports = router;    