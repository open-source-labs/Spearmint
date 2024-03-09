/**  using import statements in the electron / node files breaks npm start and nodepty 
* - types are left in place in these files for future iteration alternate import method is required for them to function
*/
// import { Application, ErrorRequestHandler, NextFunction, Request, Response, Router } from "express";
// import { Authenticator } from "passport";
// import { defaultErrType } from "./utils/backendTypes";

const express = require('express');
const app/*: Application*/ = express();
const cookieParser/*: Function*/ = require('cookie-parser');
const router/*: Router*/ = require('./routes/router');
const PORT/*: number */= 3001;
const passport/*: Authenticator*/ = require('passport');

// dotenv.config({ path: './config/config.env' });
require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize passport session
app.use(passport.initialize());
// app.use(passport.session());

app.use('/', router);

// Any other request is caught here
app.use((req/*: Request*/, res/*: Response*/)/*: Response*/ => res.status(404).send('Error 404: No content found'));

// Express global error handler
app.use((err/*: ErrorRequestHandler*/, req/*: Request*/, res/*: Response*/, next/*: NextFunction*/)/*: Response*/ => {
  const defaultErr/*: defaultErrType*/ = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'An error occurred',
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(err);
});

// Start server
app.listen(PORT, ()/*: void*/ => {
  console.log(`TEST Server listening on port: ${PORT}`);
});

module.exports = app;
module.exports = app;