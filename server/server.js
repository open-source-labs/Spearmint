const express = require('express');
const app = express();
// TODO: Import router file
const router = require('./routes/router');
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handler to direct all requests to the endpoint / to router file
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
  console.log(errorObj.log, ' ', errorObj.err);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
