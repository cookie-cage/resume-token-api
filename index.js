const app = require('express')();
const bodyParser = require('body-parser');
const resources = require('./resources/index.js');

// security
app.disable('x-powered-by');
app.disable('etag');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routing
app.use('/healthcheck', resources.healthcheck);
app.use('/', resources.token);

// http server
app.listen(process.env.APP_PORT);
