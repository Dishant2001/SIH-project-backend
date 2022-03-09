const express = require("express");
const { registerUser, loginUser, logoutUser, addProject } = require("../controllers/userController");

const router = express.Router();

// router.post("/login", authUser);
// router.post("/", registerUser);

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/addproject").post(addProject);
router.route("/logout").get(logoutUser);


module.exports = router;