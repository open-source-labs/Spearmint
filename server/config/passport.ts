import { TablePaginationUnstyledSpacerSlotProps } from "@mui/base";
import { Error } from "mongoose";
import { Authenticator, Profile } from "passport";

const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GithubUser, GoogleUser } = require('../models/userModel.js');

module.exports = function (passport: Authenticator) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: 'd6dd018bbd5fcd3eae01',
        clientSecret: 'a402c23eaad0cdb5e6094ce8bba259c7e2e1757f',
        callbackURL: 'http://localhost:3001/auth/github/callback',
      },

      (accessToken: String, refreshToken: (String | undefined), profile: Profile, done: Function): void => {
        //console.log('this is our accessToken:', accessToken);
        // we are checking if the github profile is in our monogDB
        GithubUser.findOne({ githubId: profile.id }, (err: Error, result: { githubId: String, username: String }): void => {
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
              .then((newUser): void => {
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

      (accessToken: String, refreshToken: (String | undefined), profile: Profile, done: Function): void => {
        //console.log('this is our accessToken:', accessToken);
        // we are checking if the google profile is in our monogDB
        GoogleUser.findOne({ googleId: profile.id }, (err: Error, result: {googleId: String, username: String}) => {
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
              .then((newUser): void => {
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

  passport.serializeUser((user, done): void => {
    done(null, user);
  });

  passport.deserializeUser((obj: (false | Express.User | null | undefined), done): void => {
    done(null, obj);
  });
};
