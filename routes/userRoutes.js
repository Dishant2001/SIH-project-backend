const express = require("express");
const { registerUser, loginUser, logoutUser, addProject, heiprojects, heilist, applied, ongoing, completed,falist, getProjectId,applytofa } = require("../controllers/userController");

const router = express.Router();

// router.post("/login", authUser);
// router.post("/", registerUser);

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/addproject").post(addProject);
router.route("/logout").get(logoutUser);
router.route("/applied").post(applied);
router.route("/ongoing").post(ongoing);
router.route("/completed").post(completed);
router.route("/heilist").get(heilist);
router.route("/falist").get(falist);
router.route("/getProjectId/:_id").get(getProjectId);
router.route("/applytofa/:_id").get(applytofa);

module.exports = router;