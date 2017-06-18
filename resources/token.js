'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true });
var schema = require('../schemas/token.js');
var validate = ajv.compile(schema);

// generates a new token
router.post('/', function (req, res, next) {
    if (!validate(req.body))
        return res.status(400).json(validate.errors);

    let options = {
        exp: Math.floor(Date.now() / 1000) + process.env.JWT_EXPIRES_IN,
        iss: req.body.owner
    };

    let token = jwt.sign(options, process.env.JWT_SECRET);

    res.status(201).json({ token: token });
});

// validates the given :token
router.get('/validate/:token', function (req, res, next) {
    var valid = null;

    try {
        jwt.verify(req.params.token, process.env.JWT_SECRET);
        valid = true;
    } catch (err) {
        valid = false;
    }

    res.status(200).json({ valid: valid })
});

module.exports = router;
