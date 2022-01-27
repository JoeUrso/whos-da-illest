const express = require("express");
const router = express.Router();
const battlesController = require("../controllers/battlesController");

router.route("/").get(battlesController.index);
router.route("/rapper-data").get(battlesController.getToken);

module.exports = router;
