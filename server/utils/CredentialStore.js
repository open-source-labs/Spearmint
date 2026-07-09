/**
 * Centralizes access to secrets (Mongo URI, OAuth client credentials) loaded
 * from environment variables. Every read of a credential in the server code
 * should go through here instead of touching process.env or a literal
 * directly, so there is exactly one place that knows how secrets are sourced.
 *
 * Missing variables throw immediately with a message naming the variable,
 * instead of failing later inside mongoose/passport with an opaque error.
 */

require('dotenv').config({ path: __dirname + '/../../.env' });

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and fill in a value before starting the server.`
    );
  }
  return value;
}

const CredentialStore = {
  getMongoUri() {
    return requireEnv('MONGO_LINK');
  },

  getGithubOAuth() {
    return {
      clientID: requireEnv('GITHUB_CLIENT_ID'),
      clientSecret: requireEnv('GITHUB_CLIENT_SECRET'),
      callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3001/auth/github/callback',
    };
  },

  getGoogleOAuth() {
    return {
      clientID: requireEnv('GOOGLE_CLIENT_ID'),
      clientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/auth/google/callback',
    };
  },
};

module.exports = CredentialStore;
