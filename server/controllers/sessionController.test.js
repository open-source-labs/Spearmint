jest.mock('../utils/SessionManager', () => ({
  createSession: jest.fn(),
  endSession: jest.fn(),
  findSession: jest.fn(),
}));

const SessionManager = require('../utils/SessionManager');
const sessionController = require('./sessionController');

function mockRes() {
  return { locals: {} };
}

describe('sessionController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('startSession', () => {
    it('creates a session for res.locals.userId and stores the token on res.locals.ssid', (done) => {
      const req = {};
      const res = mockRes();
      res.locals.userId = 'user-1';
      SessionManager.createSession.mockImplementation((userId, callback) => {
        expect(userId).toBe('user-1');
        callback(null, 'random-token-abc');
      });

      sessionController.startSession(req, res, (err) => {
        expect(err).toBeUndefined();
        expect(res.locals.ssid).toBe('random-token-abc');
        done();
      });
    });

    it('passes non-duplicate-key errors to next', (done) => {
      const req = {};
      const res = mockRes();
      const dbError = { code: 500, message: 'db down' };
      SessionManager.createSession.mockImplementation((userId, callback) => callback(dbError));

      sessionController.startSession(req, res, (err) => {
        expect(err).toBe(dbError);
        done();
      });
    });

    it('swallows a duplicate-key (11000) error and still calls next', (done) => {
      const req = {};
      const res = mockRes();
      const dupError = { code: 11000, message: 'duplicate' };
      SessionManager.createSession.mockImplementation((userId, callback) => callback(dupError));

      sessionController.startSession(req, res, (err) => {
        expect(err).toBeUndefined();
        done();
      });
    });
  });

  describe('endSession', () => {
    it('ends the session for req.cookies.ssid and calls next', (done) => {
      const req = { cookies: { ssid: 'token-to-end' } };
      const res = mockRes();
      SessionManager.endSession.mockImplementation((token, callback) => {
        expect(token).toBe('token-to-end');
        callback(null);
      });

      sessionController.endSession(req, res, (err) => {
        expect(err).toBeUndefined();
        done();
      });
    });

    it('passes errors to next', (done) => {
      const req = { cookies: { ssid: 'token-to-end' } };
      const res = mockRes();
      const dbError = new Error('db down');
      SessionManager.endSession.mockImplementation((token, callback) => callback(dbError));

      sessionController.endSession(req, res, (err) => {
        expect(err).toBe(dbError);
        done();
      });
    });
  });

  describe('isLoggedIn', () => {
    it('calls next with no error when a session is found', (done) => {
      const req = { cookies: { ssid: 'valid-token' } };
      const res = mockRes();
      SessionManager.findSession.mockImplementation((token, callback) => {
        expect(token).toBe('valid-token');
        callback(null, { token: 'valid-token', userId: 'user-1' });
      });

      sessionController.isLoggedIn(req, res, (err) => {
        expect(err).toBeUndefined();
        done();
      });
    });

    it('calls next with an error string when no session is found', (done) => {
      const req = { cookies: { ssid: 'missing-token' } };
      const res = mockRes();
      SessionManager.findSession.mockImplementation((token, callback) => callback(null, null));

      sessionController.isLoggedIn(req, res, (err) => {
        expect(err).toBe('User Not Logged In');
        done();
      });
    });

    it('passes db errors to next', (done) => {
      const req = { cookies: { ssid: 'x' } };
      const res = mockRes();
      const dbError = new Error('db down');
      SessionManager.findSession.mockImplementation((token, callback) => callback(dbError));

      sessionController.isLoggedIn(req, res, (err) => {
        expect(err).toBe(dbError);
        done();
      });
    });
  });
});
