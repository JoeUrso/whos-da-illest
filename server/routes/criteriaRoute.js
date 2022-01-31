const express = require("express");
const router = express.Router();
const criteriaController = require("../controllers/criteriaController");

router.route("/").get(criteriaController.index);

module.exports = router;
