const express = require("express");
const router = express.Router();
const battlesController = require("../controllers/battlesController");

router.route("/").get(battlesController.index);
router.route("/rapper1").patch(battlesController.incrementRapper1Wins);
router.route("/rapper2").patch(battlesController.incrementRapper2Wins);

// TODO should Spotify be its own route?
router.route("/rapper-data").get(battlesController.getToken);

module.exports = router;
