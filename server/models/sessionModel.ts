// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');
// Schema constructor
const Schema = mongoose.Schema;

// Initialize a new schema object for collection 'session'
const sessionSchema = new Schema({
  // Save user ID
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
