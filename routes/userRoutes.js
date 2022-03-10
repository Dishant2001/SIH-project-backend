const express = require("express");
const { registerUser, loginUser, logoutUser, addProject, heiprojects, heilist } = require("../controllers/userController");

const router = express.Router();

// router.post("/login", authUser);
// router.post("/", registerUser);

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/addproject").post(addProject);
router.route("/logout").get(logoutUser);
router.route("/heiprojects").post(heiprojects);
router.route("/heilist").post(heilist);


module.exports = router;