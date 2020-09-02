const axios = require("axios");

module.exports = (URL) => {
  return axios.create({
    baseURL: URL,
  });
};
