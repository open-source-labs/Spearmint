import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { MongoError, FindCursor } from "mongodb";
import { sessionControllerType } from "../utils/backendTypes";

// Import the session model that defines schema of session
const Session = require('../models/sessionModel');

const sessionController:sessionControllerType = {};

// Middleware to initialize a session upon successful login
sessionController.startSession = (req: Request, res: Response, next: NextFunction): void => {
  Session.create({ cookieId: res.locals.userId }, (err: MongoError, result: void): void => {
    if (err && err.code !== 11000) return next(err);
    res.locals.ssid = res.locals.userId;
    return next();
  });
};

// Middleware to end currently active sessions, if any
sessionController.endSession = (req: Request, res: Response, next: NextFunction): void => {
  Session.deleteMany({ cookieId: req.cookies.ssid }, (err: ErrorRequestHandler): void => {
    if (err) return next(err);
    return next();
  });
};

// Middleware to check if entered user is currently already logged in
sessionController.isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
  Session.find({ cookieId: req.cookies.ssid }, (err: ErrorRequestHandler, data: Array<{cookieId: String, createdAt: Date}>): void => {
    if (err) return next(err);
    if (data.length === 0) return next('User Not Logged In');
    return next();
  });
};

module.exports = sessionController;
