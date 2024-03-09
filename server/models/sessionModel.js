/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/

// import { Schema as SchemaType } from "mongoose";

// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');
// Schema constructor
const Schema = mongoose.Schema;

// Initialize a new schema object for collection 'session'
const sessionSchema/* : SchemaType */ = new Schema({
  // Save user ID
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
