const axios = require("axios");
const { TIMEOUT } = process.env;

module.exports = (URL) => {
  return axios.create({
    baseURL: URL,
    timeout: parseInt(TIMEOUT),
  });
};
