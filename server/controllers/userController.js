const { User, Test } = require('../models/userModel');

const userController = {};

// Middleware to encrypt passwords using bcrypt
userController.bcrypt = (req, res, next) => {
  const { password } = req.body;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      res.locals.encryptedPassword = hash;
      return next();
    });
  });
};

userController.signup = (req, res, next) => {
  const { username } = req.body;
};
