const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// Media Controllers
const mediaController = require("../controllers/media");

// Media Routing
router.get("/", verifyToken, mediaController.getAllMedia);
router.delete("/:id", mediaController.deleteById);
router.post("/", mediaController.create);

module.exports = router;
