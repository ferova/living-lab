require('dotenv').config();

const assert = require('assert');

const {
    APP_NAME,
    APP_VERSION,
    PORT,
    BASE_PATH,
    MONGO_URI
  } = process.env;
  
  const variables = {
    APP_NAME,
    APP_VERSION,
    PORT,
    BASE_PATH,
    MONGO_URI
  };
  
  Object.keys(variables).forEach((key) => {
    assert(variables[key], `${key} is required`);
  });
  
  module.exports = variables;