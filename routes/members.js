const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.put("/update", verifyToken, usersController.updateProfile);
router.get("/", verifyToken, usersController.getProfile);
router.post("/logout", verifyToken, usersController.logout);

module.exports = router;
