const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', JSON.stringify(res.locals.userId).replace(/\"/g, ''));
  return next();
};

cookieController.deleteCookie = (req, res, next) => {
  res.clearCookie('ssid');
  return next();
};

module.exports = cookieController;
