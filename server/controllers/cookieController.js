/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/
// import { NextFunction, Request, Response } from "express";
// import { cookieControllerType } from "../utils/backendTypes";

const cookieController /*: cookieControllerType*/ = {};

/**
 * Middleware to initialize a cookie when user logs in.
 *
 * Previously set the cookie with no options at all (no httpOnly, secure,
 * or sameSite flags), and the value was the raw session identifier passed
 * through JSON.stringify().replace() to strip quotes. Now takes the
 * already-string token from SessionManager directly and sets all three
 * security flags.
 * @author winjolu
 */
cookieController.setSSIDCookie = (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: void*/ => {
  res.cookie('ssid', res.locals.ssid, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  return next();
};

/**
 * Middleware to delete a cookie upon user logging out.
 *
 * This function existed but was never called from anywhere — /logout only
 * ran sessionController.endSession, which deletes the session server-side
 * but left the cookie sitting in the browser. Now wired into the /logout
 * route in server/routes/router.js, and the clearCookie options must match
 * the flags used in setSSIDCookie above or the browser won't clear it.
 * @author winjolu
 */
cookieController.deleteCookie = (req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: void*/ => {
  res.clearCookie('ssid', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  return next();
};

module.exports = cookieController;
