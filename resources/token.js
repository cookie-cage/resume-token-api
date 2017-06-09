'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Token = mongoose.model('Token');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
    let token = jwt.sign({
        data: req.body.key
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    let payload = {
        token: token
    };

    Token.create(payload, function(err, data){
        if (err) {
            req.body = err;
            return res.status(400).json(err);
        }

        res.status(201).json(data);
    });

});

router.get('/', function(req, res, next) {

    Token.find(function(err, data){
        res.status(200).json(data);
    });

});

router.delete('/', function(req, res, next) {

    Token.remove(req.params.id, function(err, data){
        if(err)
            return res.status(400).json(err);

        res.status(202).send(data);
    });
});

router.get('/:id', function(req, res, next) {

    Token.findById(req.params.id, function(err, data){
        if(!data)
            return res.status(404).send();

        res.status(200).json(data);
    });

});

router.delete('/:id', function(req, res, next) {

    Token.findByIdAndRemove(req.params.id, function(err, data){
        if(err)
            return res.status(400).json(err);

        if(!data)
            return res.status(404).send();

        res.status(202).send(data);
    });
});


module.exports = router;
