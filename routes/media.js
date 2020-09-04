var express = require("express");
var router = express.Router();
const apiRoot = require("./apiRoot");
const { MEDIA_HOST } = process.env;
const api = apiRoot(MEDIA_HOST);

// get list media
router.get("/", async (req, res) => {
  try {
    const mediaRes = await api.get("/media");

    res.status(200).json({
      status: "success",
      message: "get all media list",
      data: mediaRes.data,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: "something wrong when get data" });
  }
});

module.exports = router;
