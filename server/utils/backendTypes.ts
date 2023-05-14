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
  bcrypt?: Function,
  signup?: Function,
  login?: Function,
  getUsers?: Function,
  githubLogin?: Function,
  googleLogin?: Function,
}

export interface sessionControllerType {

}

export interface cookieControllerType {
  setSSIDCookie?: Function,
  deleteCookie?: Function,
}

export interface testStateControllerType {

}
