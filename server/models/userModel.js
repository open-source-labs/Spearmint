const mongoose = require('mongoose');

const MONGO_URI =
  'postgres://tvbwuzta:m_4lxbce7W5l7YCMwbRl2R9JIy7xrYrc@batyr.db.elephantsql.com/tvbwuzta';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo DB Successfully'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// Schema and model for 'user' collection
const userSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  tests: [
    {
      name: String,
      id: { type: 'ObjectId', ref: 'test' },
    },
  ],
});
const User = mongoose.model('user', userSchema);

// Schema and model for 'test' collection
const testSchema = new Schema({
  name: String,
});
const Test = mongoose.model('test', testSchema);

module.exports = {
  User,
  Test,
};
