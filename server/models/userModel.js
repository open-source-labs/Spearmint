require('dotenv').config({ path: __dirname + '/./../../.env' });
// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

const MONGO_URI = `mongodb://ericgpark:${process.env.MONGO_URI}@spearmint-shard-00-00.xbncu.mongodb.net:27017,spearmint-shard-00-01.xbncu.mongodb.net:27017,spearmint-shard-00-02.xbncu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rbxspt-shard-0&authSource=admin&retryWrites=true&w=majority`;

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

module.exports = mongoose.model('user', userSchema);
