const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const PORT = 3001;
const passport = require('passport');

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
app.use((req, res) => res.status(404).send('Error 404: No content found'));

// Express global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(err);
});

// Start server
app.listen(PORT, () => {
  console.log(`TEST Server listening on port: ${PORT}`);
});

module.exports = app;