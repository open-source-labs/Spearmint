const path = require('path');
const express = require('express');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const testStateController = require('../controllers/testStateController');
const router = express.Router();

router.post('/signup', userController.bcrypt, userController.signup, (req, res) => {
  res.status(200).json('Sign Up Successful');
});

router.post(
  '/login',
  userController.login,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json('Logged in');
  }
);

router.post('/upload', sessionController.isLoggedIn, testStateController.upload, (req, res) => {
  res.status(200).json('Test Uploaded Successfully');
});

router.get('/getTests', sessionController.isLoggedIn, testStateController.getTests, (req, res) => {
  console.log(res.locals.tests);
  res.status(200).json(res.locals.tests);
});

module.exports = router;
