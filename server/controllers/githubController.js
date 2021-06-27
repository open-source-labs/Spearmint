const fetch = require('node-fetch');

const githubController = {};

githubController.getToken = (req, res, next) => {
    fetch(`https://github.com/login/oauth/access_token?client_id=7dc8c4f030f9201bf917&client_secret=77eb3da6e1012f382eaeee40c77d7c2bec7797c7&code=${req.params.code}`, {
        method: 'POST',
        headers: {
            accept: 'application/json'
        }
    })
    .then((res) => res.json())
    .then(token => {
      res.locals.token = token.access_token
      return next()
    })
    .catch(err => next(err))
}

githubController.getUser = (req, res, next) => {
    fetch('https://api.github.com/user', {
        headers: {
            Authorization: 'token ' + res.locals.token,
        }
    })
    .then(res => res.json())
    .then(user => {
      res.locals.userId = user.id.toString();
      return next()    
    })
    .catch(err => next(err))
}

module.exports = githubController; 