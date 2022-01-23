const express = require("express");
const router = express.Router();
const gradesController = require("../controllers/gradesController");

router.route("/").get(gradesController.index);

module.exports = router;
