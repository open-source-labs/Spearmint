/**
 * Creates, looks up, and destroys sessions. The session token is a
 * cryptographically random value unrelated to the user's Mongo _id, so it
 * can't be guessed or derived the way a raw database id can.
 *
 * Added as part of a security-hardening pass: the `ssid` cookie was
 * previously just the user's raw MongoDB `_id` (guessable — Mongo
 * ObjectIds encode a timestamp + counter, not random bits) with no cookie
 * flags set. This class plus the httpOnly/secure/sameSite flags added in
 * server/controllers/cookieController.js replace that.
 * @author winjolu
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
    Session.create({ token, userId }, (err) => {
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
