const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = require('./routes/router');
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handler to direct all requests to the endpoint / to router file
// app.get('/', (req, res) => {
//   const requestToken = req.query.code

//   fetch('https://github.com/login/oauth/authorize?client_id=/231673e9fd54f1b427ec&client_secret=e5a38a6341e7d67c4d91ba70934100e3c74e5600', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
//   .then((response) => {
//     const accessToken = response.data.access_token
//     console.log(response.data)

//   })
//   .catch((err) => console.log(err))
  
//   // redirect the user to the home page, along with the access token
//   res.redirect(`/`)
// })

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
  console.log(errorObj.log, ' ', err);
  return res.status(errorObj.status).json(err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
