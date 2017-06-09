'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Token = new Schema({
    id: ObjectId,
    updated_at: Date,
    created_at: Date,
    token: String
});

mongoose.model('Token', Token);
