var express = require('express');
var router = express.Router();

router.get('/about', function(req, res) {
    res.send('birds');
});

module.exports = router;
