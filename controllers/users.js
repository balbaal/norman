const axios = require("../configs/axios");
const { USER_HOST } = process.env;
const api = axios(USER_HOST);
const jwt = require("jsonwebtoken");
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
      const {
        data: { data },
      } = await api.post("/users/login", {
        email,
        password,
      });
      const token = jwt.sign(data, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });
      const refreshToken = jwt.sign(data, JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
      });

      await api.post("/refresh-token", { refreshToken, memberId: data.id });

      return res
        .status(200)
        .json({ status: "success", data: { token, refreshToken } });
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
  updateProfile: async (req, res) => {
    const { email, name, password, profession, avatar } = req.body;

    try {
      const resUpdate = await api.put(`/users/update/${req.user.id}`, req.body);
      res.status(200).json(resUpdate.data);
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
  getProfile: async (req, res) => {
    const { id } = req.user;

    try {
      const resUser = await api.get(`/users/${id}`);
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
  logout: async (req, res) => {
    const { id } = req.user;

    try {
      await api.post("/users/logout", { member_id: id });
      return res.status(204).json({
        status: "success",
        message: `success logout and deleted user id: ${id}`,
      });
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
