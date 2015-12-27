module.exports = {
    GET: {
        '/users': function(req, res){
            foo();
            res.end('tobi, loki, ferret');
        },
        '/user/:id': function(req, res, id){  //其中的每一项都是对请求URL的映射，并包含要调用的回调函数
            res.end('user ' + id);
        }
    },
    DELETE: {
        '/user/:id': function(req, res, id){
            res.end('deleted user ' + id);
        }
    }
};