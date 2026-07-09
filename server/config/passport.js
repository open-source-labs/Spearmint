/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/
// import { TablePaginationUnstyledSpacerSlotProps } from "@mui/base";
// import { Error } from "mongoose";
// import { Authenticator, Profile } from "passport";

const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GithubUser, GoogleUser } = require('../models/userModel');
const CredentialStore = require('../utils/CredentialStore');

module.exports = function (passport/*:  Authenticator */) {
  passport.use(
    new GitHubStrategy(
      CredentialStore.getGithubOAuth(),

      (accessToken/* : String */, refreshToken/* : (String | undefined) */, profile/* : Profile */, done/* : Function */)/* : void */ => {
        //console.log('this is our accessToken:', accessToken);
        // we are checking if the github profile is in our monogDB
        GithubUser.findOne({ githubId: profile.id }, (err/* : Error */, result/* : { githubId: String, username: String } */)/* : void */ => {
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
              .then((newUser)/* : void  */=> {
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
      CredentialStore.getGoogleOAuth(),

      (accessToken/* : String */, refreshToken/* : (String | undefined) */, profile/* : Profile */, done/* : Function */)/* : void  */=> {
        //console.log('this is our accessToken:', accessToken);
        // we are checking if the google profile is in our monogDB
        GoogleUser.findOne({ googleId: profile.id }, (err/* : Error */, result/* : {googleId: String, username: String} */) => {
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
              .then((newUser)/* : void  */=> {
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

  passport.serializeUser((user, done)/* : void  */=> {
    done(null, user);
  });

  passport.deserializeUser((obj/* : (false | Express.User | null | undefined) */, done)/* : void */ => {
    done(null, obj);
  });
};
