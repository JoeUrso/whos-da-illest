const express = require("express");
const router = express.Router();
const rappersController = require("../controllers/rappersController");

router.route("/").get(rappersController.index);
router.route("/with-grades").get(rappersController.rappersWithGrades);

module.exports = router;
