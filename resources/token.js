const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
const schema = require('../schemas/token.js');

const validate = ajv.compile(schema);

// generates a new token
router.post('/', (req, res) => {
  if (!validate(req.body)) return res.status(400).json(validate.errors);

  const options = {
    exp: Math.floor(Date.now() / 1000) + process.env.JWT_EXPIRES_IN,
    iss: req.body.owner,
  };

  const token = jwt.sign(options, process.env.JWT_SECRET);

  return res.status(201).json({ token });
});

// validates the given :token
router.get('/validate/:token', (req, res) => {
  let valid = null;

  try {
    jwt.verify(req.params.token, process.env.JWT_SECRET);
    valid = true;
  } catch (err) {
    valid = false;
  }

  res.status(200).json({ valid });
});

module.exports = router;
