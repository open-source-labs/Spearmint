/**
 * Creates, looks up, and destroys sessions. The session token is a
 * cryptographically random value unrelated to the user's Mongo _id, so it
 * can't be guessed or derived the way a raw database id can.
 */
const crypto = require('crypto');
const Session = require('../models/sessionModel');

class SessionManager {
  static generateToken() {
    // 32 bytes = 256 bits of entropy, comfortably over the 128-bit minimum
    return crypto.randomBytes(32).toString('hex');
  }

  static createSession(userId, callback) {
    const token = SessionManager.generateToken();
    Session.create({ token, userId }, (err, session) => {
      if (err) return callback(err);
      return callback(null, token);
    });
  }

  static findSession(token, callback) {
    Session.findOne({ token }, callback);
  }

  static endSession(token, callback) {
    Session.deleteMany({ token }, callback);
  }
}

module.exports = SessionManager;
