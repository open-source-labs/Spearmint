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
  // Opaque, cryptographically random session token (not the user's _id)
  token: { type: String, required: true, unique: true },
  // The user this session belongs to
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

// Reconciles the collection's actual indexes with the schema above. Needed
// because Mongoose doesn't drop indexes that a schema stops declaring —
// without this, an old unique index on a since-renamed/removed field (e.g.
// a previous `cookieId` field) keeps rejecting every new document that
// lacks that field.
Session.syncIndexes().catch((err) => console.log('Session.syncIndexes failed:', err));

module.exports = Session;
