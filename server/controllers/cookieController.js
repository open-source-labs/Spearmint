const cookieController = {};

// Middleware to initialize a cookie when user logs in
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('we are in cookieController!!')
  res.cookie('ssid', JSON.stringify(res.locals.userId).replace(/\"/g, ''));
  return next();
};

// Middleware to delete a cookie upon user logging out
cookieController.deleteCookie = (req, res, next) => {
  res.clearCookie('ssid');
  return next();
};

module.exports = cookieController;
