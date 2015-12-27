var connect = require('connect'),
    hello = require('./middleware/hello'),
    users = require('./middleware/users'),
    pets = require('./middleware/pets'),
    errorHandler = require('./middleware/errorhandler'),
    errorPage = require('./middleware/errorPage'),

    api = connect()
        .use(users)
        .use(pets)
        .use(errorHandler),


    app = connect()
        .use(hello)
        .use('/api', api)
        .use(errorPage)
        .listen(3000);




