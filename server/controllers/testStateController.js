/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/
// import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
// import { FindCursor } from "mongodb";
// import { testStateControllerType } from "../utils/backendTypes";

// Import test state model that defines the structure of test stored in DB
const TestState = require('../models/testStateModel');

const testStateController /* :testStateControllerType */ = {};

// Middleware to upload a passed test into DB
// NOTE: this feature's frontend (UploadTest.ts) has been fully commented out
// and is unreachable from the UI. TestState.create below never actually
// used the destructured values (it passes the String/Object constructors
// instead), which is why they're unused here. Out of scope for this pass —
// tracked as the abandoned cloud-save feature, not part of the auth/CI work.
/* eslint-disable no-unused-vars */
testStateController.upload = (req /* : Request */, res /* : Response */, next /* : NextFunction */) /* : void */ => {
  const { testName, testType, testState }/*:
  { testName : string, testType : string, testState : Object }*/ = req.body;
  const userId /* : number */ = req.cookies.ssid;

  TestState.create(
    {
      userId: String,
      testName: String,
      testType: String,
      testState: Object
    },
    (err /* : Error */) /* : void */ => {
      if (err) return next('Upload Failed');
      return next();
    }
  );
};
/* eslint-enable no-unused-vars */

// Middleware too get all saved tests of current user and of selected type
testStateController.getTests = (req /* : Request */, res /* : Response */, next /* : NextFunction */) => {
  TestState.find({ userId: req.cookies.ssid, testType: req.params.testType }, (err /* : ErrorRequestHandler */, result /* : FindCursor */) /* : void */ => {
    // If an error occurs, invoke error handler with err object
    if (err) return next(err);
    // Save resulting tests array to locals object
    res.locals.tests = result;
    return next();
  });
};

module.exports = testStateController;
