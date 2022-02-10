// Import the session model that defines schema of session
const Session = require('../models/sessionModel');

const sessionController = {};

// Middleware to initialize a session upon successful login
sessionController.startSession = (req, res, next) => {
  // console.log('we made it to startSession!');
  Session.create({ cookieId: res.locals.userId }, (err, result) => {
    if (err && err.code !== 11000) return next(err);
    res.locals.ssid = res.locals.userId;
    console.log('session created');
    return next();
  });
};

// Middleware to end currently active sessions, if any
sessionController.endSession = (req, res, next) => {
  Session.deleteMany({ cookieId: req.cookies.ssid }, (err) => {
    if (err) return next(err);
    return next();
  });
};

// Middleware to check if entered user is currently already logged in
sessionController.isLoggedIn = (req, res, next) => {
  Session.find({ cookieId: req.cookies.ssid }, (err, data) => {
    if (err) return next(err);
    if (data.length === 0) return next('User Not Logged In');
    return next();
  });
};

module.exports = sessionController;
