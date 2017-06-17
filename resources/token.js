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

    Token.create({token: token})
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get('/', function(req, res, next) {
    Token.find()
        .then(function(data){
            res.status(200).json(data);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
});

router.delete('/', function(req, res, next) {

    Token.remove()
        .then(function(data){
            res.status(202).send(data);
        })
        .catch(function(err){
            res.status(400).json(err);
        });
});

router.get('/:id', function(req, res, next) {

    Token.findById(req.params.id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(404).send();
        });
});

router.delete('/:id', function(req, res, next) {

    Token.findByIdAndRemove(req.params.id)
        .then((data) => {
            if(!data)
                return res.status(404).send();

            res.status(202).send(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;
