const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  console.log(typeof res.locals.userId)
  Session.create({ cookieId: res.locals.userId }, (err, result) => {
    if (err && err.code !== 11000) return next(err);
    res.locals.ssid = req.cookies.ssid;
    return next();
  });
};

sessionController.endSession = (req, res, next) => {
  Session.deleteMany({ cookieId: req.cookies.ssid }, (err) => {
    if (err) return next(err);
    return next();
  });
};

sessionController.isLoggedIn = (req, res, next) => {
  console.log('sessionController.isLoggedIn: req.cookies.ssid:', req.cookies.ssid);
  Session.find({ cookieId: req.cookies.ssid }, (err, data) => {
    if (err) return next(err);
    if (data.length === 0) return next('User Not Logged In');
    return next();
  });
};

module.exports = sessionController;
