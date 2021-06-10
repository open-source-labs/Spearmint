const path = require('path');
const express = require('express');

const userController = require('../controllers/userController.js');
const testController = require('../controllers/testController.js');
const router = express.Router();

router.post('/signup', userController.bcrypt, userController.signup, (req, res) => {
  res.status(200).send(res.locals.newUser);
});

router.post('/login', userController.login, (req, res) => {
  res.status(200).send('Logged in');
});

module.exports = router;
