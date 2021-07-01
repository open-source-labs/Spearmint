// Import test state model that defines the structure of test stored in DB
const TestState = require('../models/testStateModel');
const testStateController = {};

// Middleware to upload a passed test into DB
testStateController.upload = (req, res, next) => {
  TestState.create(
    {
      userId: req.cookies.ssid,
      testName: req.body.testName,
      testType: req.body.testType,
      testState: req.body.testState,
    },
    (err) => {
      if (err) return next('Upload Failed');
      return next();
    }
  );
};

// Middleware too get all saved tests of current user and of selected type
testStateController.getTests = (req, res, next) => {
  TestState.find({ userId: req.cookies.ssid, testType: req.params.testType }, (err, result) => {
    // If an error occurs, invoke error handler with err object
    if (err) return next(err);
    // Save resulting tests array to locals object
    res.locals.tests = result;
    return next();
  });
};

module.exports = testStateController;
