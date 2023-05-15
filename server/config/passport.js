const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GithubUser, GoogleUser } = require('../models/userModel.js');

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: 'd6dd018bbd5fcd3eae01',
        clientSecret: 'a402c23eaad0cdb5e6094ce8bba259c7e2e1757f',
        callbackURL: 'http://localhost:3001/auth/github/callback',
      },

      (accessToken, refreshToken, profile, done) => {
        //console.log('this is our accessToken:', accessToken);
        // we are checking if the github profile is in our monogDB
        GithubUser.findOne({ githubId: profile.id }, (err, result) => {
          if (result) {
            // already have this user
            //console.log('user is: ', result);
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
                //console.log('created new user: ', newUser);
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
    new GoogleStrategy(
      {
        clientID: '783732985723-dfvjj0bro5mbc1u1ouo4e90ue0hjndcg.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3001/auth/google/callback',
      },

      (accessToken, refreshToken, profile, done) => {
        //console.log('this is our accessToken:', accessToken);
        // we are checking if the google profile is in our monogDB
        GoogleUser.findOne({ googleId: profile.id }, (err, result) => {
          if (result) {
            // already have this user
            //console.log('user is: ', result);
            // res.locals.userId = result._id
            done(null, result);
          } else if (!result) {
            // if not, create user in our db
            new GoogleUser({
              googleId: profile.id,
            })
              .save()
              .then((newUser) => {
                //console.log('created new user: ', newUser);
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
