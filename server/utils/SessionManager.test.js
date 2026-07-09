jest.mock('../models/sessionModel', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  deleteMany: jest.fn(),
}));

const Session = require('../models/sessionModel');
const SessionManager = require('./SessionManager');

describe('SessionManager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    it('returns a 64-character hex string (256 bits of entropy)', () => {
      const token = SessionManager.generateToken();
      expect(token).toMatch(/^[0-9a-f]{64}$/);
    });

    it('generates a different token on each call', () => {
      const a = SessionManager.generateToken();
      const b = SessionManager.generateToken();
      expect(a).not.toBe(b);
    });
  });

  describe('createSession', () => {
    it('stores a generated token alongside the given userId and returns the token', (done) => {
      Session.create.mockImplementation((doc, cb) => cb(null, { ...doc, _id: 'fake-doc-id' }));

      SessionManager.createSession('user-123', (err, token) => {
        expect(err).toBeNull();
        expect(token).toMatch(/^[0-9a-f]{64}$/);
        expect(Session.create).toHaveBeenCalledWith(
          { token, userId: 'user-123' },
          expect.any(Function)
        );
        done();
      });
    });

    it('does not use the userId as the token', (done) => {
      Session.create.mockImplementation((doc, cb) => cb(null, doc));

      SessionManager.createSession('user-123', (err, token) => {
        expect(token).not.toBe('user-123');
        done();
      });
    });

    it('passes errors through to the callback without a token', (done) => {
      const fakeErr = new Error('duplicate key');
      Session.create.mockImplementation((doc, cb) => cb(fakeErr));

      SessionManager.createSession('user-123', (err, token) => {
        expect(err).toBe(fakeErr);
        expect(token).toBeUndefined();
        done();
      });
    });
  });

  describe('findSession', () => {
    it('looks up a session by token', () => {
      const cb = jest.fn();
      SessionManager.findSession('abc123', cb);
      expect(Session.findOne).toHaveBeenCalledWith({ token: 'abc123' }, cb);
    });
  });

  describe('endSession', () => {
    it('deletes sessions by token', () => {
      const cb = jest.fn();
      SessionManager.endSession('abc123', cb);
      expect(Session.deleteMany).toHaveBeenCalledWith({ token: 'abc123' }, cb);
    });
  });
});
