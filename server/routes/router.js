/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/

/* eslint-disable comma-dangle */

// import { Request, Response, Router } from "express";
// import { cookieControllerType, sessionControllerType, testStateControllerType, userControllerType } from "../utils/backendTypes";
// import { Authenticator } from "passport";

// Import Express to streamline server logic with router
const express = require('express');
// Import all relevant controller objects equipped with middleware
const passport/*: Authenticator*/ = require('passport');
const userController/*: userControllerType*/ = require('../controllers/userController');
const cookieController/*: cookieControllerType*/ = require('../controllers/cookieController');
const sessionController/*: sessionControllerType*/ = require('../controllers/sessionController');
const testStateController/*: testStateControllerType*/ = require('../controllers/testStateController');
const InputSanitizer = require('../utils/InputSanitizer');
// const { ipcRenderer } = require('electron');
// const githubController = require('../controllers/githubController');

// Initialize an express router
const router/*: Router*/ = express.Router();

/**
 * /signup and /login both now run InputSanitizer.validateCredentials first,
 * rejecting any non-string username/password (e.g. a NoSQL operator-
 * injection payload like { "$ne": null }) before either route touches
 * Mongoose. Neither route validated its input at all before this.
 * @author winjolu
 */
router.post(
  '/signup',
  // Reject non-string username/password before they reach Mongoose
  InputSanitizer.validateCredentials,
  // Bcrypt middleware to encrypt user password
  userController.bcrypt,
  // Signup middleware to sign user up with encrypted credentials
  userController.signup,
  // Anonymous middleware to send back valid response
  (req/*: Request*/, res/*: Response*/)/*: Response*/ => res.sendStatus(200)
);

/**
 * startSession now runs before setSSIDCookie (previously the order was
 * reversed) — the cookie was being set from res.locals.userId before
 * SessionManager had even generated the session token, so the cookie
 * value didn't exist yet at the point it was written.
 * @author winjolu
 */
router.post(
  '/login',
  // Reject non-string username/password before they reach Mongoose
  InputSanitizer.validateCredentials,
  // Login middleware checks encrypted credentials
  userController.login,
  // Session middleware to initialize new session (generates the token)
  sessionController.startSession,
  // Cookie middleware to set the cookie to the generated session token
  cookieController.setSSIDCookie,
  // Anonymous middleware to send back valid response
  (req/*: Request*/, res/*: Response*/)/*: void*/ => {
    res.status(200).json({ ssid: res.locals.ssid });
  }
);

/**
 * cookieController.deleteCookie is now actually called here — it existed
 * as dead code before this, so /logout deleted the server-side session but
 * left the browser's cookie in place.
 * @author winjolu
 */
router.get(
  '/logout',
  // Session middleware to end any existing sessions
  sessionController.endSession,
  // Cookie middleware to clear the client-side cookie
  cookieController.deleteCookie,
  // Anonymous middleware to send back valid response
  (req/*: Request*/, res/*: Response*/)/*: void*/ => {
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
  (req/*: Request*/, res/*: Response*/)/*: void*/ => {
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
  (req/*: Request*/, res/*: Response*/)/*: void*/ => {
    res.status(200).json(res.locals.tests);
  }
);

// Set up route for get requests to github login auth
router.get(
  '/auth/github',
  // Asks users if they will ALLOW or DENY us permission to request their github profile
  passport.authenticate('github', { scope: ['profile'] })
);

/**
 * Same session/cookie ordering fix as /login above — startSession has to
 * run before setSSIDCookie so the token exists before it's written to the
 * cookie. Applies to both OAuth callbacks (this one and /auth/google/callback
 * below).
 * @author winjolu
 */
// if user does ALLOW, then they are automatically redirected to the callback endpoint
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),

  // if second passport auth is successful, then these middleware functions are invoked next
  userController.githubLogin,
  sessionController.startSession,
  cookieController.setSSIDCookie,

  // Anonymous middleware to send back valid response
  (req/*: Request*/, res/*: Response*/)/*: void*/ => {
    // we send the ssid back to the front end
    res.status(200).json({ ssid: res.locals.ssid });
  }
);


  // Anonymous middleware to send back valid response
//   (req, res) => {
//     console.log('ssid:', res.locals.ssid);
//     // we send the ssid back to the front end
//     res.status(200).json({ ssid: res.locals.ssid });
//   }
// );

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));


// if user does ALLOW, then they are automatically redirected to the callback endpoint
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  // if second passport auth is successful, then these middleware functions are invoked next
  userController.googleLogin,
  sessionController.startSession,
  cookieController.setSSIDCookie,

  // Anonymous middleware to send back valid response
  (req/*: Request*/, res/*: Response*/)/*: void*/ => {
    //console.log('ssid:', res.locals.ssid);
    // we send the ssid back to the front end
    res.status(200).json({ ssid: res.locals.ssid });
  }
);


module.exports = router;
