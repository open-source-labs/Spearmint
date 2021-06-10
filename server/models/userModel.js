const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://ericgpark:jENk%40eW6QEGez-g@codesmith.xbncu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo DB Successfully'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// Schema and model for 'user' collection
const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  tests: [
    {
      name: String,
      id: { type: 'ObjectId', ref: 'test' },
    },
  ],
});
const User = mongoose.model('user', userSchema);

module.exports = User;
