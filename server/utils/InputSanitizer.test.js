const InputSanitizer = require('./InputSanitizer');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('InputSanitizer', () => {
  describe('isValidCredentialField', () => {
    it('accepts non-empty strings', () => {
      expect(InputSanitizer.isValidCredentialField('hunter2')).toBe(true);
    });

    it('rejects an empty string', () => {
      expect(InputSanitizer.isValidCredentialField('')).toBe(false);
    });

    it('rejects undefined', () => {
      expect(InputSanitizer.isValidCredentialField(undefined)).toBe(false);
    });

    it('rejects a NoSQL operator injection object', () => {
      expect(InputSanitizer.isValidCredentialField({ $ne: null })).toBe(false);
    });

    it('rejects an array', () => {
      expect(InputSanitizer.isValidCredentialField(['admin'])).toBe(false);
    });

    it('rejects a number', () => {
      expect(InputSanitizer.isValidCredentialField(12345)).toBe(false);
    });
  });

  describe('validateCredentials', () => {
    it('calls next() when username and password are valid strings', () => {
      const req = { body: { username: 'alice', password: 'hunter2' } };
      const res = mockRes();
      const next = jest.fn();

      InputSanitizer.validateCredentials(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('rejects an object payload for username (operator injection attempt)', () => {
      const req = { body: { username: { $ne: null }, password: { $ne: null } } };
      const res = mockRes();
      const next = jest.fn();

      InputSanitizer.validateCredentials(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Username and password must both be non-empty strings.');
    });

    it('rejects a missing password field', () => {
      const req = { body: { username: 'alice' } };
      const res = mockRes();
      const next = jest.fn();

      InputSanitizer.validateCredentials(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('rejects an empty-string username', () => {
      const req = { body: { username: '', password: 'hunter2' } };
      const res = mockRes();
      const next = jest.fn();

      InputSanitizer.validateCredentials(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    // NFR: "the system shall reject NoSQL injection attempts without adding
    // noticeable latency to login/signup requests (target: under 100ms
    // overhead)". This was never actually measured before - it's a plain
    // typeof/length check, so budget it generously at 10ms to leave headroom
    // under the 100ms requirement while still catching a real regression
    // (e.g. someone replacing this with a slow regex or a synchronous
    // network call).
    it('rejects a NoSQL injection payload in well under the 100ms latency budget', () => {
      const req = { body: { username: { $ne: null }, password: { $ne: null } } };
      const res = mockRes();
      const next = jest.fn();

      const start = process.hrtime.bigint();
      InputSanitizer.validateCredentials(req, res, next);
      const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;

      expect(next).not.toHaveBeenCalled();
      expect(elapsedMs).toBeLessThan(10);
    });
  });
});
