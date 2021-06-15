const TestState = require('../models/testStateModel');

const testStateController = {};

testStateController.upload = (req, res, next) => {
  TestState.create(
    { userId: res.locals.ssid, testState: req.body.testState },
    (err, newTestState) => {
      if (err) return next('Upload Failed');
      return next();
    }
  );
};

testStateController.getTests = (req, res, next) => {
  TestState.find({ userId: res.locals.ssid }, (err, result) => {
    if (err) return next(err);
    if (result.length === 0) return next('User Has No Saved Tests');
    res.locals.tests = result;
    return next();
  });
};

module.exports = testStateController;
