import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { FindCursor } from "mongodb";
import { testStateControllerType } from "../utils/backendTypes";

// Import test state model that defines the structure of test stored in DB
const TestState = require('../models/testStateModel');
const testStateController:testStateControllerType = {};

// Middleware to upload a passed test into DB
testStateController.upload = (req: Request, res: Response, next: NextFunction): void => {
  const { testName, testType, testState }: 
  { testName: string, testType: string, testState: Object } = req.body;
  const userId: number = req.cookies.ssid;

  TestState.create(
    {
      userId: String,
      testName: String,
      testType: String,
      testState: Object
    },
    (err: Error): void => {
      if (err) return next('Upload Failed');
      return next();
    }
  );
};

// Middleware too get all saved tests of current user and of selected type
testStateController.getTests = (req: Request, res: Response, next: NextFunction) => {
  TestState.find({ userId: req.cookies.ssid, testType: req.params.testType }, (err: ErrorRequestHandler, result: FindCursor): void => {
    // If an error occurs, invoke error handler with err object
    if (err) return next(err);
    // Save resulting tests array to locals object
    res.locals.tests = result;
    return next();
  });
};

module.exports = testStateController;
