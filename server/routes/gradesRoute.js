const express = require("express");
const router = express.Router();
const gradesController = require("../controllers/gradesController");

router
    .route("/")
    .get(gradesController.index)
    .post(gradesController.addNewGrade);
router.route("/avg-grades").get(gradesController.AvgGrades);

module.exports = router;
