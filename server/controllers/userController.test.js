jest.mock('../models/userModel', () => ({ User: { create: jest.fn(), find: jest.fn() } }));

const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');
const userController = require('./userController');

function mockRes() {
  const res = { locals: {} };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('userController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('bcrypt', () => {
    it('hashes the password and stores it on res.locals, then calls next', (done) => {
      const req = { body: { password: 'hunter2' } };
      const res = mockRes();

      userController.bcrypt(req, res, () => {
        expect(typeof res.locals.encryptedPassword).toBe('string');
        expect(res.locals.encryptedPassword).not.toBe('hunter2');
        expect(bcrypt.compareSync('hunter2', res.locals.encryptedPassword)).toBe(true);
        done();
      });
    });
  });

  describe('signup', () => {
    it('creates the user and stores the new id on res.locals, then calls next', (done) => {
      const req = { body: { username: 'alice' } };
      const res = mockRes();
      res.locals.encryptedPassword = 'hashed';
      User.create.mockImplementation((doc, callback) => {
        expect(doc).toEqual({ username: 'alice', password: 'hashed' });
        callback(null, { _id: 'abc123' });
      });

      userController.signup(req, res, () => {
        expect(res.locals.userId).toBe('abc123');
        done();
      });
    });

    it('responds 400 when the username is already taken (no error, no doc)', () => {
      const req = { body: { username: 'alice' } };
      const res = mockRes();
      User.create.mockImplementation((doc, callback) => callback(null, null));

      userController.signup(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Username already exists, please choose another one.');
    });

    it('responds 400 when the username is already taken (duplicate-key error 11000)', () => {
      const req = { body: { username: 'alice' } };
      const res = mockRes();
      const dupError = { code: 11000, message: 'duplicate key' };
      User.create.mockImplementation((doc, callback) => callback(dupError, null));

      userController.signup(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Username already exists, please choose another one.');
    });

    it('passes a non-duplicate-key db error to next instead of reporting "username taken"', (done) => {
      const req = { body: { username: 'alice' } };
      const res = mockRes();
      const dbError = { code: 500, message: 'db unreachable' };
      User.create.mockImplementation((doc, callback) => callback(dbError, null));

      userController.signup(req, res, (err) => {
        expect(err).toBe(dbError);
        expect(res.status).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('login', () => {
    it('sets res.locals.userId and calls next on a matching password', (done) => {
      const password = 'hunter2';
      const hash = bcrypt.hashSync(password, 10);
      const req = { body: { username: 'alice', password } };
      const res = mockRes();
      User.find.mockImplementation((query, callback) => {
        expect(query).toEqual({ username: 'alice' });
        callback(null, [{ _id: 'abc123', username: 'alice', password: hash }]);
      });

      userController.login(req, res, (err) => {
        expect(err).toBeUndefined();
        expect(res.locals.userId).toBe('abc123');
        done();
      });
    });

    it('calls next with an error string when no user matches the username', (done) => {
      const req = { body: { username: 'nobody', password: 'x' } };
      const res = mockRes();
      User.find.mockImplementation((query, callback) => callback(null, []));

      userController.login(req, res, (err) => {
        expect(err).toBe('Incorrect username/password combo');
        done();
      });
    });

    it('calls next with an error string when the password does not match', (done) => {
      const hash = bcrypt.hashSync('correct-password', 10);
      const req = { body: { username: 'alice', password: 'wrong-password' } };
      const res = mockRes();
      User.find.mockImplementation((query, callback) => {
        callback(null, [{ _id: 'abc123', username: 'alice', password: hash }]);
      });

      userController.login(req, res, (err) => {
        expect(err).toBe('Incorrect username/password combination');
        done();
      });
    });

    it('passes a db error to next', (done) => {
      const req = { body: { username: 'alice', password: 'x' } };
      const res = mockRes();
      const dbError = new Error('db unreachable');
      User.find.mockImplementation((query, callback) => callback(dbError, null));

      userController.login(req, res, (err) => {
        expect(err).toBe(dbError);
        done();
      });
    });
  });

  describe('githubLogin / googleLogin', () => {
    it('githubLogin stores req.user._id on res.locals and calls next', () => {
      const req = { user: { _id: 'gh-user-1' } };
      const res = mockRes();
      const next = jest.fn();

      userController.githubLogin(req, res, next);

      expect(res.locals.userId).toBe('gh-user-1');
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('githubLogin throws when req.user is missing', () => {
      const req = {};
      const res = mockRes();

      expect(() => userController.githubLogin(req, res, jest.fn())).toThrow();
    });

    it('googleLogin stores req.user._id on res.locals and calls next', () => {
      const req = { user: { _id: 'g-user-1' } };
      const res = mockRes();
      const next = jest.fn();

      userController.googleLogin(req, res, next);

      expect(res.locals.userId).toBe('g-user-1');
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('googleLogin throws when req.user is missing', () => {
      const req = {};
      const res = mockRes();

      expect(() => userController.googleLogin(req, res, jest.fn())).toThrow();
    });
  });
});
