/* eslint-disable comma-dangle */
// Import Express to streamline server logic with router
const express = require('express');
// Import all relevant controller objects equipped with middleware
const passport = require('passport');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const testStateController = require('../controllers/testStateController');
// const { ipcRenderer } = require('electron');
// const githubController = require('../controllers/githubController');

// Initialize an express router
const router = express.Router();

// Set up route for post requests to /signup
router.post(
  '/signup',
  // Bcrypt middleware to encrypt user password
  userController.bcrypt,
  // Signup middleware to sign user up with encrypted credentials
  userController.signup,
  // Anonymous middleware to send back valid response
  (req, res) => {
    res.status(200).json('Sign Up Successful');
  }
);

// Set up route for post requests to /login
router.post(
  '/login',
  // Login middleware checks encrypted credentials
  userController.login,
  // Cookie middleware to set up a new cookie
  cookieController.setSSIDCookie,
  // Session middleware to initialize new session
  sessionController.startSession,
  // Anonymous middleware to send back valid response
  (req, res) => {
    console.log('ssid:', res.locals.ssid);
    res.status(200).json({ ssid: res.locals.ssid });
  }
);

// Set up route for get requests to /logout
router.get(
  '/logout',
  // Session middleware to end any existing sessions
  sessionController.endSession,
  // Anonymous middleware to send back valid response
  (req, res) => {
    res.status(200).json('Logged Out Successfully');
  }
);

// Set up route for post requests to /upload
router.post(
  '/upload',
  // Session middleware to check if current user is signed in
  sessionController.isLoggedIn,
  // Upload middleware to save passed test object into DB
  testStateController.upload,
  // Anonymous middleware to send back valid response
  (req, res) => {
    res.status(200).json('Test Uploaded Successfully');
  }
);

// Set up route for get requests to /getTests with type passed as param
router.get(
  '/getTests/:testType',
  // Session middleware to check if current user is signed in
  sessionController.isLoggedIn,
  // GetTests middleware to retrieve all saved tests from DB
  testStateController.getTests,
  // Anonymous middleware to send back valid response
  (req, res) => {
    res.status(200).json(res.locals.tests);
  }
);

// Set up route for get requests to github login auth
router.get(
  '/auth/github',
  // Asks users if they will ALLOW or DENY us permission to request their github profile
  passport.authenticate('github', { scope: ['profile'] })
);

// if user does ALLOW, then they are automatically redirected to the callback endpoint
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),

  // if second passport auth is successful, then these middleware functions are invoked next
  userController.githubLogin,
  cookieController.setSSIDCookie,
  sessionController.startSession,

  // Anonymous middleware to send back valid response
  (req, res) => {
    console.log('ssid:', res.locals.ssid);
    // we send the ssid back to the front end
    res.status(200).json({ ssid: res.locals.ssid });
  }
);

// Did something get updated with oauth? Is this code functional or should we delete it?
// Set up route for get requests to github login auth
// router.get(
//   '/login/facebook',
//   // Asks users if they will ALLOW or DENY us permission to request their github profile
//   passport.authenticate('facebook', { scope: ['email'] })
// );


  // Anonymous middleware to send back valid response
  (req, res) => {
    console.log('ssid:', res.locals.ssid);
    // we send the ssid back to the front end
    res.status(200).json({ ssid: res.locals.ssid });
  }
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));


// if user does ALLOW, then they are automatically redirected to the callback endpoint
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  // if second passport auth is successful, then these middleware functions are invoked next
  userController.googleLogin,
  cookieController.setSSIDCookie,
  sessionController.startSession,

  // Anonymous middleware to send back valid response
  (req, res) => {
    console.log('ssid:', res.locals.ssid);
    // we send the ssid back to the front end
    res.status(200).json({ ssid: res.locals.ssid });
  }
);


module.exports = router;
