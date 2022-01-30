const express = require("express");
const router = express.Router();
const rappersController = require("../controllers/rappersController");

router.route("/").get(rappersController.index);
router.route("/rapper1-wins").patch(rappersController.editRapper1Wins);
router.route("/rapper1-losses").patch(rappersController.editRapper1Losses);
router.route("/rapper2-wins").patch(rappersController.editRapper2Wins);
router.route("/rapper2-losses").patch(rappersController.editRapper2Losses);

module.exports = router;
