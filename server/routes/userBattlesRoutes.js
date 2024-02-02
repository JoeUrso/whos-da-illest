const express = require("express");
const router = express.Router();
const userBattlesController = require("../controllers/userBattlesController");

// GET all user battles
router.route("/").get(userBattlesController.index);

// GET user battles by user ID
router.route("/:id").get(userBattlesController.getUserBattlesByUserId);

// GET total user battles count by user ID
router
    .route("/:id/count")
    .get(userBattlesController.getUserBattlesCountByUserId);

// POST a new user battle
router.route("/").post(userBattlesController.addUserBattle);

module.exports = router;
