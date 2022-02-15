const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// router.post("/login", authUser);
// router.post("/", registerUser);

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);


module.exports = router;