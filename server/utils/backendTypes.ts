import { NextFunction, Request, Response } from "express";

const express = require('express')

export interface defaultErrType {
  log: string,
  status: number,
  message: {
    err: string,
  },
}

export interface userControllerType {
  bcrypt: Function,
  signup: Function,
  login: Function,
  getUsers: Function,
  githubLogin: Function,
  googleLogin: Function,
}

export interface sessionControllerType {
  startSession?: Function,
  endSession?: Function,
  isLoggedIn?: Function,
}

export interface cookieControllerType {
  setSSIDCookie?: Function,
  deleteCookie?: Function,
}

export interface testStateControllerType {
  upload?: Function,
  getTests?: Function,
}
