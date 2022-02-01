const express = require("express");
const router = express.Router();
const battlesController = require("../controllers/battlesController");

// GET AND PATCH TO BATTLES TABLE
router.route("/").get(battlesController.index);
router.route("/rapper1").patch(battlesController.incrementRapper1Wins);
router.route("/rapper2").patch(battlesController.incrementRapper2Wins);

// SPOTIFY API DATA FOR BATTLES TO USE
router.route("/rapper-data").get(battlesController.getToken);

module.exports = router;
