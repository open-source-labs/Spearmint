const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb://ericgpark:jENk%40eW6QEGez-g@spearmint-shard-00-00.xbncu.mongodb.net:27017,spearmint-shard-00-01.xbncu.mongodb.net:27017,spearmint-shard-00-02.xbncu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rbxspt-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo DB Successfully'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// Schema and model for 'user' collection
const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});
const User = mongoose.model('user', userSchema);

module.exports = User;
