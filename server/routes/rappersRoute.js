const express = require("express");
const router = express.Router();
const rappersController = require("../controllers/rappersController");

router.route("/").get(rappersController.index);

module.exports = router;
