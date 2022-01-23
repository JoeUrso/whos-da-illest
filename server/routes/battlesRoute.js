const express = require("express");
const router = express.Router();
const battlesController = require("../controllers/battlesController");

router.route("/").get(battlesController.index);

module.exports = router;
