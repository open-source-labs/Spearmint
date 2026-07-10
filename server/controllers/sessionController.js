/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/
// import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
// import { MongoError, FindCursor } from "mongodb";
// import { sessionControllerType } from "../utils/backendTypes";

// SessionManager owns token generation/storage/lookup for sessions
const SessionManager = require('../utils/SessionManager');

const sessionController /*:sessionControllerType*/ = {};

// Middleware to initialize a session upon successful login
sessionController.startSession = (req /* : Request */, res /* : Response */, next /* : NextFunction */) /* : void */ => {
  SessionManager.createSession(res.locals.userId, (err /* : MongoError */, token /* : string */) /* : void */ => {
    if (err && err.code !== 11000) return next(err);
    res.locals.ssid = token;
    return next();
  });
};

// Middleware to end currently active sessions, if any
sessionController.endSession = (req /* : Request */, res /*: Response */, next /* : NextFunction */)/*: void*/ => {
  SessionManager.endSession(req.cookies.ssid, (err /* : ErrorRequestHandler */) /* void */ => {
    if (err) return next(err);
    return next();
  });
};

// Middleware to check if entered user is currently already logged in
sessionController.isLoggedIn = (req /* :Request*/, res /* Response*/, next /* : NextFunction */) /* void */ => {
  SessionManager.findSession(req.cookies.ssid, (err /* : ErrorRequestHandler */, session /* : { token: String, userId: String, createdAt: Date } | null */) /* void */ => {
    if (err) return next(err);
    if (!session) return next('User Not Logged In');
    return next();
  });
};

module.exports = sessionController;
