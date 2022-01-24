// Import Express to streamline server logic with router
const express = require('express');
// Import all relevant controller objects equipped with middleware
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const testStateController = require('../controllers/testStateController');
const passport = require('passport');
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
    res.status(200)
      .json('Sign Up Successful');
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

router.get('/auth/github',
  // first authenticate asks users if they will ALLOW or DENY us permission to request their github profile
  passport.authenticate('github', { scope: [ 'profile' ] }));

  
  // if user does allow, then they are automatically redirected to the callback endpoint
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),

// if this authentication is successful, THEN callback function is invoked
  function(req, res, next) {
    console.log('this is req.user', typeof req.user._id);
    // Successful authentication, redirect home.
    console.log("github authentication successful!")
    res.locals.userId = req.user._id;
    return next()
  },
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log('ssid:', res.locals.ssid);
    // ipcRenderer.send('github-authorized', {ssid: res.locals.ssid} )
    res.status(200).json({ ssid: res.locals.ssid });
  }
)

module.exports = router;