import { expression } from "@babel/template";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Cursor } from "mongoose";
import { BasicGroupByOptions } from "rxjs";
import { userControllerType } from "../utils/backendTypes";

const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController: userControllerType = {};

// Middleware to encrypt passwords using bcrypt
userController.bcrypt = (req: Request, res: Response, next: NextFunction): void => {
  // The cost factor determines how much time is needed to calculate a single bcrypt hash
  const saltRounds: number = 10;
  // Destructure password from request body
  const { password }: { password: String } = req.body;
  // Generate the salt by passing in saltRounds (cost factor)
  bcrypt.genSalt(saltRounds, (err: ErrorRequestHandler, salt: String): void => {
    // Hash a password by passing in the plaintext into the hash function
    bcrypt.hash(password, salt, (err: ErrorRequestHandler, hash: String): void => {
      // Save encrypted password into res.locals to be accessed later
      res.locals.encryptedPassword = hash;
      return next();
    });
  });
};

// Middleware to save user information in database
userController.signup = (req: Request, res: Response, next: NextFunction): (void | Response) => {
  // collection.create method to insert new user
  User.create(
    // Pass in username from request body and encrypted password
    { username: req.body.username, password: res.locals.encryptedPassword },
    // Callback to handle results of query
    (err: ErrorRequestHandler, newUser: (null | undefined | { _id: number })) => {
      if (!newUser) return res.status(400).json("Username already exists, please choose another one.");
      // If there is an error, invoke global error handler
      if (err) return next(err);
      // Save user ID into response locals
      res.locals.userId = newUser._id;
      // Inovke next middleware
      return next();
    }
  );
};

// Middleware to check credentials and log user into application
userController.login = (req: Request, res: Response, next: NextFunction): void => {
  // Collection.find method to look for all user instances with passed username
  User.find({ username: req.body.username }, (err: ErrorRequestHandler, 
    result: Array<{ _id: number, username: String, password: String }>): void => {
    // If there is an error, invoke global error handler
    if (err) return next(err);
    // If there are no matching usernames, invoke global error handler
    if (result.length === 0) return next('Incorrect username/password combo');
    // If there is a user with passed username, use the bcrypt.compare method to compare plaintext password with encrypted password
    bcrypt.compare(req.body.password, result[0].password, (err: ErrorRequestHandler, match: boolean) => {
      // If an error occurs in the compare method, invoke global error handler
      if (err) return next(err);
      // If there is a match, invoke next middleware
      if (match) {
        res.locals.userId = result[0]._id;
        return next();
      }
      // If there is no match, invoke global error handler
      return next('Incorrect username/password combination');
    });
  });
};

userController.getUsers = (req: Request, res: Response, next: NextFunction): void => {
  // Collection.find method to look for all user instances with passed username
  User.find({}, (err: ErrorRequestHandler, result: Array<{ _id: number, username: String, password: String }>) => {
    // If there is an error, invoke global error handler
    if (err) return next(err);
    res.locals.users = result;
    return next();
  });
};

userController.githubLogin = (req: Request, res: Response, next: NextFunction): void => {
  // store user._id in res.locals
  if(!req.user || !req.user._id) throw new Error("User or user ID not defined.")
  res.locals.userId = req.user._id;

  return next();
};

userController.googleLogin = (req: Request, res: Response, next: NextFunction): void => {
  // store user._id in res.locals
  if(!req.user || !req.user._id) throw new Error("User or user ID not defined.")
  res.locals.userId = req.user._id;

  return next();
};

module.exports = userController;
