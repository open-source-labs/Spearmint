require('dotenv').config({ path: __dirname + '/./../../.env' });
// Import module for fetch functionality
const fetch = require('node-fetch');

const githubController = {};

// Middleware to retrieve a token based on API call with client_id passed
githubController.getToken = (req, res, next) => {
  // Use client_id and client_secret keys to make a post request
  fetch(
    `https://github.com/login/oauth/access_token?client_id=7dc8c4f030f9201bf917&client_secret=${process.env.GIT_CLIENT_SECRET_KEY}&code=${req.params.code}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    }
  )
    // Parse response
    .then((res) => res.json())
    .then((token) => {
      // Save token into locals object for future reference
      res.locals.token = token.access_token;
      // Invoke next middleware
      return next();
    })
    // Invoke error handler upon any err occurence
    .catch((err) => next(err));
};

// Middleware to retrieve user object based on API call with token passed
githubController.getUser = (req, res, next) => {
  // Make a get request with token passed in headers
  fetch('https://api.github.com/user', {
    headers: {
      Authorization: 'token ' + res.locals.token,
    },
  })
    // Parse response
    .then((res) => res.json())
    .then((user) => {
      // Save user's ID into locals
      res.locals.userId = user.id.toString();
      // Invoke next middleware
      return next();
    })
    // Invoke error handler upon any err occurence
    .catch((err) => next(err));
};

module.exports = githubController;
