const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: req.cookies.ssid });
  return next();
};

sessionController.isLoggedIn = (req, res, next) => {
  Session.find({ cookieId: req.body.ssid }, (err, data) => {
    if (err) return next(err);
    return next();
  });
};

module.exports = sessionController;
