import { NextFunction, Request, Response } from "express";
import { cookieControllerType } from "../utils/backendTypes";

const cookieController: cookieControllerType = {};

// Middleware to initialize a cookie when user logs in
cookieController.setSSIDCookie = (req: Request, res: Response, next: NextFunction): void => {
  // eslint-disable-next-line no-useless-escape
  //removing double quotes with Regex?
  res.cookie('ssid', JSON.stringify(res.locals.userId).replace(/\"/g, ''));
  return next();
};

// Middleware to delete a cookie upon user logging out
cookieController.deleteCookie = (req: Request, res: Response, next: NextFunction): void => {
  res.clearCookie('ssid');
  return next();
};

module.exports = cookieController;
