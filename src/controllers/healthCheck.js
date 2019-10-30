const { APP_NAME, APP_VERSION } = require('../config/Settings');

module.exports = {
  healthCheck: (req, res, next) => {
    res.payload = {
      app_version: APP_VERSION,
      app_name: APP_NAME,
      time: new Date()
    };
    return next();
  },
};