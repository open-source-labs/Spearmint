const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

// Middleware to encrypt passwords using bcrypt
userController.bcrypt = (req, res, next) => {
  // The cost factor determines how much time is needed to calculate a single bcrypt hash
  const saltRounds = 10;
  // Destructure password from request body
  const { password } = req.body;
  // Generate the salt by passing in saltRounds (cost factor)
  bcrypt.genSalt(saltRounds, (err, salt) => {
    // Hash a password by passing in the plaintext into the hash function
    bcrypt.hash(password, salt, (err, hash) => {
      // Save encrypted password into res.locals to be accessed later
      res.locals.encryptedPassword = hash;
      return next();
    });
  });
};

// Middleware to save user information in database
userController.signup = (req, res, next) => {
  // collection.create method to insert new user
  User.create(
    // Pass in username from request body and encrypted password
    { username: req.body.username, password: res.locals.encryptedPassword },
    // Callback to handle results of query
    (err, newUser) => {
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
userController.login = (req, res, next) => {
  // Collection.find method to look for all user instances with passed username
  User.find({ username: req.body.username }, (err, result) => {
    // If there is an error, invoke global error handler
    if (err) return next(err);
    // If there are no matching usernames, invoke global error handler
    if (result.length === 0) return next('Incorrect username/password combo');
    // If there is a user with passed username, use the bcrypt.compare method to compare plaintext password with encrypted password
    bcrypt.compare(req.body.password, result[0].password, (err, match) => {
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

userController.getUsers = (req, res, next) => {
  // Collection.find method to look for all user instances with passed username
  User.find({}, (err, result) => {
    // If there is an error, invoke global error handler
    if (err) return next(err);
    res.locals.users = result;
    return next();
  });
};

userController.githubLogin = (req, res, next) => {
  // console.log('this is req.user', typeof req.user._id);

  // Successful authentication, redirect home.
  console.log('github authentication successful!');

  // store user._id in res.locals
  res.locals.userId = req.user._id;

  return next();
};

module.exports = userController;
