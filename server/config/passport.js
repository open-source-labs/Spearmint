const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// var FacebookStrategy = require('passport-facebook')
const passport = require('passport');
const { User, GithubUser, FacebookUser } = require('../models/userModel.js');

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: 'd6dd018bbd5fcd3eae01',
        clientSecret: 'a402c23eaad0cdb5e6094ce8bba259c7e2e1757f',
        callbackURL: 'http://localhost:3001/auth/github/callback',
      },

      (accessToken, refreshToken, profile, done) => {
        console.log('this is our accessToken:', accessToken);
        // we are checking if the github profile is in our monogDB
        GithubUser.findOne({ githubId: profile.id }, (err, result) => {
          if (result) {
            // already have this user
            console.log('user is: ', result);
            // res.locals.userId = result._id
            done(null, result);
          } else if (!result) {
            // if not, create user in our db
            new GithubUser({
              githubId: profile.id,
              username: profile.displayName,
            })
              .save()
              .then((newUser) => {
                console.log('created new user: ', newUser);
                //   res.locals.userId = newUser._id
                done(null, newUser);
              });
          } else if (err) {
            console.log(err);
          }
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: '3128695707446412',
        clientSecret: 'a1603893d7e61e618237e8bcad03ac68',
        callbackURL: 'http://localhost:3001/oauth2/redirect/facebook',
      },

      (accessToken, refreshToken, profile, done) => {
        console.log('this is our accessToken:', accessToken);
        // we are checking if the github profile is in our monogDB
        FacebookUser.findOne({ facebookId: profile.id }, (err, result) => {
          if (result) {
            // already have this user
            console.log('user is: ', result);
            // res.locals.userId = result._id
            done(null, result);
          } else if (!result) {
            // if not, create user in our db
            new FacebookUser({
              facebookId: profile.id,
            })
              .save()
              .then((newUser) => {
                console.log('created new user: ', newUser);
                //   res.locals.userId = newUser._id
                done(null, newUser);
              });
          } else if (err) {
            console.log(err);
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};
