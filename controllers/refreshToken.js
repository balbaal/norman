const axios = require("../configs/axios");
const { USER_HOST } = process.env;
const api = axios(USER_HOST);
const jwt = require("jsonwebtoken");
const { response } = require("express");
const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

module.exports = {
  refreshToken: async (req, res) => {
    const { email, refresh_token } = req.body;

    if (!email || !refresh_token) {
      return res.status(400).json({
        status: "error",
        message: "email / refresh token didn't send",
      });
    }

    try {
      await api.get("/refresh-token", {
        params: { refresh_token },
      });

      jwt.verify(refresh_token, JWT_SECRET_REFRESH_TOKEN, (err, resp) => {
        if (err) {
          return res
            .status(403)
            .json({ status: "error", message: err.message });
        }

        if (email !== resp.email) {
          return res.status(400).json({
            status: "error",
            message: "email is not valid",
          });
        }

        // renew access token
        const token = jwt.sign(
          {
            id: resp.id,
            email: resp.email,
            name: resp.name,
            role: resp.role,
            profession: resp.process,
            avatar: resp.avatar,
          },
          JWT_SECRET,
          { expiresIn: JWT_ACCESS_TOKEN_EXPIRED }
        );

        return res.status(200).json({
          status: "success",
          data: { token },
        });
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
