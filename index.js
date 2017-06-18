'use strict';

var app = require('express')();
var bodyParser = require('body-parser');
var resources = require('./resources/index.js');

// security
app.disable('x-powered-by');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routing
app.use('/healthcheck', resources.healthcheck);
app.use('/', resources.token);

// http server
app.listen(process.env.APP_PORT, function(){
    console.log('listening on port:' + process.env.APP_PORT);
});
