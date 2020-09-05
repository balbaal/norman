const express = require("express");
const router = express.Router();

// Media Controllers
const mediaController = require("../controllers/media");

// Media Routing
router.get("/", mediaController.getAllMedia);
router.delete("/:id", mediaController.deleteById);
router.post("/", mediaController.create);

module.exports = router;
