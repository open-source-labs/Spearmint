const CredentialStore = require('./CredentialStore');

describe('CredentialStore', () => {
  const savedEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...savedEnv };
  });

  describe('getMongoUri', () => {
    it('returns the Mongo URI when MONGO_LINK is set', () => {
      process.env.MONGO_LINK = 'mongodb+srv://user:pass@cluster.example.net/db';
      expect(CredentialStore.getMongoUri()).toBe('mongodb+srv://user:pass@cluster.example.net/db');
    });

    it('throws a clear error when MONGO_LINK is missing', () => {
      delete process.env.MONGO_LINK;
      expect(() => CredentialStore.getMongoUri()).toThrow('MONGO_LINK');
    });
  });

  describe('getGithubOAuth', () => {
    it('returns clientID, clientSecret, and a default callbackURL when set', () => {
      process.env.GITHUB_CLIENT_ID = 'gh-id';
      process.env.GITHUB_CLIENT_SECRET = 'gh-secret';
      delete process.env.GITHUB_CALLBACK_URL;

      expect(CredentialStore.getGithubOAuth()).toEqual({
        clientID: 'gh-id',
        clientSecret: 'gh-secret',
        callbackURL: 'http://localhost:3001/auth/github/callback',
      });
    });

    it('honors GITHUB_CALLBACK_URL when set', () => {
      process.env.GITHUB_CLIENT_ID = 'gh-id';
      process.env.GITHUB_CLIENT_SECRET = 'gh-secret';
      process.env.GITHUB_CALLBACK_URL = 'https://example.com/auth/github/callback';

      expect(CredentialStore.getGithubOAuth().callbackURL).toBe('https://example.com/auth/github/callback');
    });

    it('throws a clear error when GITHUB_CLIENT_ID is missing', () => {
      delete process.env.GITHUB_CLIENT_ID;
      process.env.GITHUB_CLIENT_SECRET = 'gh-secret';
      expect(() => CredentialStore.getGithubOAuth()).toThrow('GITHUB_CLIENT_ID');
    });

    it('throws a clear error when GITHUB_CLIENT_SECRET is missing', () => {
      process.env.GITHUB_CLIENT_ID = 'gh-id';
      delete process.env.GITHUB_CLIENT_SECRET;
      expect(() => CredentialStore.getGithubOAuth()).toThrow('GITHUB_CLIENT_SECRET');
    });
  });

  describe('getGoogleOAuth', () => {
    it('returns clientID, clientSecret, and a default callbackURL when set', () => {
      process.env.GOOGLE_CLIENT_ID = 'g-id';
      process.env.GOOGLE_CLIENT_SECRET = 'g-secret';
      delete process.env.GOOGLE_CALLBACK_URL;

      expect(CredentialStore.getGoogleOAuth()).toEqual({
        clientID: 'g-id',
        clientSecret: 'g-secret',
        callbackURL: 'http://localhost:3001/auth/google/callback',
      });
    });

    it('throws a clear error when GOOGLE_CLIENT_ID is missing', () => {
      delete process.env.GOOGLE_CLIENT_ID;
      process.env.GOOGLE_CLIENT_SECRET = 'g-secret';
      expect(() => CredentialStore.getGoogleOAuth()).toThrow('GOOGLE_CLIENT_ID');
    });

    it('throws a clear error when GOOGLE_CLIENT_SECRET is missing', () => {
      process.env.GOOGLE_CLIENT_ID = 'g-id';
      delete process.env.GOOGLE_CLIENT_SECRET;
      expect(() => CredentialStore.getGoogleOAuth()).toThrow('GOOGLE_CLIENT_SECRET');
    });
  });
});
