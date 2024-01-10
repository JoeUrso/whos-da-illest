const express = require("express");
const router = express.Router();
const rappersController = require("../controllers/rappersController");

// GET DATA FROM RAPPERS TABLE
router.route("/").get(rappersController.index);

// PATCH TO UPDATE RAPPER WINS AND LOSSES
router.route("/rapper-wins").patch(rappersController.editRapperWins);
router.route("/rapper-losses").patch(rappersController.editRapperLosses);

module.exports = router;
