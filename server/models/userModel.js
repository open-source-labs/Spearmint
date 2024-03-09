/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/

// import { Schema as SchemaType } from "mongoose";

require('dotenv').config({ path: __dirname + '/./../../.env' });
// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_LINK;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo DB Successfully'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// Initialize a new schema object for collection 'user'
const userSchema/*: SchemaType*/ = new Schema({
  // Save username and password of user
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const User/*: { username: String, password: String }*/ = mongoose.model('user', userSchema);

const githubSchema/*: SchemaType*/ = new Schema({
  // Save username and password of user
  githubId: { type: String, require: true, unique: true },
  username: { type: String, require: true },
});

const GithubUser/*: { githubId: String, username: String }*/ = mongoose.model('githubUser', githubSchema);


const googleSchema/*: SchemaType*/ = new Schema({
  // Save username and password of user
  googleId: { type: String, require: true, unique: true },
  username: { type: String, require: true },
});

const GoogleUser/*: { googleId: String, username: String }*/ = mongoose.model('googleUser', googleSchema);


module.exports = {
  User,
  GithubUser,
  GoogleUser
}
