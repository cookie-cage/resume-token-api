'use strict';

var mongoose = require('mongoose');
require('../models/token.js');

module.exports = function (next) {
    mongoose.connect(process.env.MONGO_URI, next);
};
