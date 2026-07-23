/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/

// import { expression } from "@babel/template";
// import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
// import { Cursor } from "mongoose";
// import { BasicGroupByOptions } from "rxjs";
// import { userControllerType } from "../utils/backendTypes";

/**
 * Errors on lines 89-90 and 97-98 are due to Typescript not recognizing inherent _id property on MongoDB collections.
 */


const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');

const userController/*: userControllerType*/ = {

  // Middleware to encrypt passwords using bcrypt
  bcrypt: (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: void*/ => {
    // The cost factor determines how much time is needed to calculate a single bcrypt hash
    const saltRounds = 10;
    // Destructure password from request body
    const { password }/*: { password: String }*/ = req.body;
    // Generate the salt by passing in saltRounds (cost factor)
    bcrypt.genSalt(saltRounds, (saltErr/*: ErrorRequestHandler*/, salt/*: String*/)/*: void*/ => {
      // Hash a password by passing in the plaintext into the hash function
      bcrypt.hash(password, salt, (err/*: ErrorRequestHandler*/, hash/*: String*/)/*: void*/ => {
        // Save encrypted password into res.locals to be accessed later
        res.locals.encryptedPassword = hash;
        return next();
      });
    });
  },

  /**
   * Middleware to save user information in database.
   *
   * This route threw `ReferenceError: username is not defined` on every
   * request since at least 2022: the actual query value (req.body.username)
   * had been written inside this file's type-annotation-as-comment
   * convention instead of as real code, leaving bare object-shorthand
   * (just the word "username") that referenced a variable which was never
   * declared. Fixed by writing the real key: value pairs below.
   *
   * The duplicate-key check (err.code !== 11000) was added afterward: the
   * controller-level tests written for this file caught that a duplicate
   * username was being reported to the caller as a generic Mongoose error
   * instead of the intended "username already exists" 400 response.
   * @author winjolu
   */
  signup: (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: (void | Response)*/ => {
    // collection.create method to insert new user
    User.create(
      // Pass in username from request body and encrypted password
      { username: req.body.username, password: res.locals.encryptedPassword },
      // Callback to handle results of query
      (err/*: ErrorRequestHandler*/, newUser/*: (null | undefined | { _id: number })*/) => {
        // A duplicate-key error (11000, from the unique username index) is the
        // expected "username taken" case below; any other error is a genuine
        // failure and must not be reported as "username already exists"
        if (err && err.code !== 11000) return next(err);
        if (!newUser) return res.status(400).json("Username already exists, please choose another one.");
        // Save user ID into response locals
        res.locals.userId = newUser._id;
        // Inovke next middleware
        return next();
      }
    );
  },

  /**
   * Middleware to check credentials and log user into application.
   *
   * Same historical bug as signup above — the query object had the same
   * "value written inside a comment, bare word left in the code" mistake,
   * referencing an undefined `username` variable and throwing on every
   * request. Fixed by writing the real key: value pair below. Also now runs behind
   * InputSanitizer.validateCredentials (see server/routes/router.js), which
   * rejects non-string username/password before either of these routes runs.
   * @author winjolu
   */
  login: (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: void*/ => {
    // Collection.find method to look for all user instances with passed username
    User.find({ username: req.body.username }, (err/*: ErrorRequestHandler*/,
      result/*: Array<{ _id: number, username: String, password: String }>*/)/*: void*/ => {
      // If there is an error, invoke global error handler
      if (err) return next(err);
      // If there are no matching usernames, invoke global error handler
      if (result.length === 0) return next('Incorrect username/password combo');
      // If there is a user with passed username, use the bcrypt.compare method to compare plaintext password with encrypted password
      return bcrypt.compare(req.body.password, result[0].password, (compareErr/*: ErrorRequestHandler*/, match/*: boolean*/) => {
        // If an error occurs in the compare method, invoke global error handler
        if (compareErr) return next(compareErr);
        // If there is a match, invoke next middleware
        if (match) {
          res.locals.userId = result[0]._id;
          return next();
        }
        // If there is no match, invoke global error handler
        return next('Incorrect username/password combination');
      });
    });
  },

  getUsers: (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: void*/ => {
    // Collection.find method to look for all user instances with passed username
    User.find({}, (err/*: ErrorRequestHandler*/, result/*: Array<{ _id: number, username: String, password: String }>*/) => {
      // If there is an error, invoke global error handler
      if (err) return next(err);
      res.locals.users = result;
      return next();
    });
  },

  githubLogin: (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: void*/ => {
    // store user._id in res.locals
    if(!req.user || !req.user._id) throw new Error("User or user ID not defined.")
    res.locals.userId = req.user._id;

    return next();
  },

  googleLogin: (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: void*/ => {
    // store user._id in res.locals
    if(!req.user || !req.user._id) throw new Error("User or user ID not defined.")
    res.locals.userId = req.user._id;

    return next();
  }
};

module.exports = userController;
