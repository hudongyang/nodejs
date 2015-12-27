var express = require('express'),
    formidable = require('formidable'),
    join = require('path').join,
    fs = require('fs'),
    Photo = require('../models/Photo'),
    router = express.Router();

router
    .get('/', function(req, res) {
        Photo.find({}, function(err, photos) {
            if(err) return next(err);

            res.render('photos', {
                photos: photos
            });
        });
    })
    .get('/upload', function(req, res) {
        res.render('photos/upload');
    })
    .post('/upload', function(req, res, next) {
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            var dir = req.app.get('photos'),
                file = files['img'],
                name = fields['name'] || file.name,
                path = join(dir, file.name);

            fs.rename(file.path, path, function(error) {
                if(error) return next(error);

                Photo.create({
                    name: name,
                    path: file.name
                }, function(err) {
                    if(err) return next(err);

                    res.redirect('/');
                });
            });
        });
    })
    .get('/photo/:id/download', function(req, res, next) {
        var dir = req.app.get('photos'),
            id = req.params.id;

        Photo.findById(id, function(err, photo) {
            if(err) return next(err);

            var path = join(dir, photo.path);
            // res.sendFile(path);
            res.download(path, photo.name + '.png');
        });    
    });  

module.exports = router;