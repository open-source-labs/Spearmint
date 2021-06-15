const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: req.cookies.ssid }, (err, result) => {
    if (err) return next(err);
  });
  return next();
};

sessionController.isLoggedIn = (req, res, next) => {
  Session.find({ cookieId: req.cookies.ssid }, (err, data) => {
    if (err) return next(err);
    if (data.length === 0) return next('User Not Logged In');
    res.locals.ssid = data[0]._id;
    return next();
  });
};

module.exports = sessionController;
