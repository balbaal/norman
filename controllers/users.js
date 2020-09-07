const axios = require("../configs/axios");
const { USER_HOST } = process.env;
const api = axios(USER_HOST);
const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

module.exports = {
  register: async (req, res) => {
    const { email, password, name, profession } = req.body;

    try {
      const resUser = await api.post("/users/register", req.body);
      return res.status(200).json(resUser.data);
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        return res.status(500).json({
          status: "error",
          message: "service users unavailable",
        });
      }

      console.log("error :>> ", error);
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const resUser = await api.post("/users/login", { email, password });
      return res.status(200).json(resUser.data);
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        return res.status(500).json({
          status: "error",
          message: "service users unavailable",
        });
      }

      console.log("error :>> ", error);
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
  },
};
