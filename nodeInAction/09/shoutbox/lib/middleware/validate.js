function parseFiled(field) {
    return field
        .split(/\[|\]/)
        .filter(function(s) {return s});
}

function getField(req, field) {
    var val = '';
    field.forEach(function(prop) {
        val = req.body[prop];
    });

    return val;
}

exports.required = function(field) {
    field = parseFiled(field);

    return function(req, res, next) {
        if(getField(req, field)) {
            next();
        } else {
            res.error(field.join(' ') + ' is required');   //如果没有，显示错误
            res.redirect('back');
        }
    };
};

exports.lengthAbove = function(field, len) {
    field = parseFiled(field);

    return function(req, res, next) {
        if(getField(req, field).length > len) {
            next();
        } else {
            res.error(field.join(' ') + ' must have more than ' + len + '     characters');
            res.redirect('back');
        }
    };
};