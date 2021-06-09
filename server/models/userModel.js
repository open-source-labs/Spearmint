const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://ericgpark:jENk%40eW6QEGez-g@codesmith.xbncu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
