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
    if (error.code === "ECONNREFUSED") {
      res
        .status(500)
        .json({ status: "error", message: "service api gateaway unavailable" });
    }

    res
      .status(400)
      .json({ status: "error", message: "something wrong when get data" });
  }
});

// delete media
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await api.delete(`media/${id}`);

    res.status(201).json({
      status: "success",
      message: `image with id: ${id} has been deleted`,
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      res
        .status(500)
        .json({ status: "error", message: "service api gateaway unavailable" });
    }

    console.log("error :>> ", error);

    res
      .status(error.response.status)
      .json({ status: "error", message: "failed to delete image" });
  }
});

// post media
router.post("/", async (req, res) => {
  const { image } = req.body;

  try {
    const imageRes = await api.post("/media", { image });
    res.status(201).json(imageRes.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      res
        .status(500)
        .json({ status: "error", message: "service api gateaway unavailable" });
    }

    res
      .status(400)
      .json({ status: "error", message: "failed to create media" });
  }
});

module.exports = router;
