const express = require("express");
const router = express.Router();
const battlesController = require("../controllers/battlesController");

// GET AND PATCH TO BATTLES TABLE
router.route("/").get(battlesController.index);
router.route("/rapper1").patch(battlesController.incrementRapper1Wins);
router.route("/rapper2").patch(battlesController.incrementRapper2Wins);

// GETTING ARTIST DATA
router.route("/rapper-data/:artistName").get(battlesController.getArtistData);

module.exports = router;
