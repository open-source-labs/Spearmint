/**
 * Validates login/signup credential fields before they reach a Mongoose
 * query. Express's JSON body parser will happily hand a query operator
 * object (e.g. { "$ne": null }) through as req.body.username, which
 * Mongoose would then pass straight to MongoDB as a query operator —
 * this rejects anything that isn't a plain, non-empty string first.
 *
 * Added as part of a security-hardening pass: /login and /signup had no
 * input validation at all, so a NoSQL operator-injection payload reached
 * Mongoose unvalidated. Wired into server/routes/router.js ahead of both
 * routes.
 * @author winjolu
 */
class InputSanitizer {
  static isValidCredentialField(value) {
    return typeof value === 'string' && value.length > 0;
  }

  static validateCredentials(req, res, next) {
    const { username, password } = req.body;
    if (
      !InputSanitizer.isValidCredentialField(username) ||
      !InputSanitizer.isValidCredentialField(password)
    ) {
      return res.status(400).json('Username and password must both be non-empty strings.');
    }
    return next();
  }
}

module.exports = InputSanitizer;
