require('dotenv').config({ path: __dirname + '/./../../.env' });
// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

const MONGO_URI = `mongodb+srv://ctpcheng:aaabbbccc123@cluster0.tcvug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo DB Successfully'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// Initialize a new schema object for collection 'user'
const userSchema = new Schema({
  // Save username and password of user
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const User = mongoose.model('user', userSchema);

const githubSchema = new Schema({
  // Save username and password of user
  githubId: { type: String, require: true, unique: true },
  username: { type: String, require: true },
});

const GithubUser = mongoose.model('githubUser', githubSchema);

module.exports = {
  User,
  GithubUser
}
