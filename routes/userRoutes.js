const express = require("express");
const { registerUser, loginUser, logoutUser, addProject, heiprojects, heilist, applied, ongoing, completed,falist, getProjectId,applytofa, acceptApproval, rejectApproval,fafundings } = require("../controllers/userController");

const router = express.Router();

// router.post("/login", authUser);
// router.post("/", registerUser);

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/addproject").post(addProject);
router.route("/logout").get(logoutUser);
router.route("/applied").get(applied);
router.route("/ongoing").get(ongoing);
router.route("/completed").get(completed);
router.route("/heilist").get(heilist);
router.route("/falist").get(falist);
router.route("/getProjectId/:_id").get(getProjectId);
router.route("/applytofa/:_id").get(applytofa);
router.route("/acceptApproval").post(acceptApproval);
router.route("/rejectApproval").post(rejectApproval)
router.route("/fafundings/:_id").get(fafundings);

module.exports = router;