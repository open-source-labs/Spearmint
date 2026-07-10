const cookieController = require('./cookieController');

function mockRes() {
  return {
    locals: {},
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  };
}

const EXPECTED_FLAGS = { httpOnly: true, secure: true, sameSite: 'lax' };

describe('cookieController', () => {
  describe('setSSIDCookie', () => {
    it('sets the ssid cookie to res.locals.ssid with httpOnly/secure/sameSite flags', () => {
      const req = {};
      const res = mockRes();
      res.locals.ssid = 'abc123token';
      const next = jest.fn();

      cookieController.setSSIDCookie(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith('ssid', 'abc123token', EXPECTED_FLAGS);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteCookie', () => {
    it('clears the ssid cookie with matching flags and calls next', () => {
      const req = {};
      const res = mockRes();
      const next = jest.fn();

      cookieController.deleteCookie(req, res, next);

      expect(res.clearCookie).toHaveBeenCalledWith('ssid', EXPECTED_FLAGS);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
