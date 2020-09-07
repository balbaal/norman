const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.put("/update", verifyToken, usersController.updateProfile);

module.exports = router;
