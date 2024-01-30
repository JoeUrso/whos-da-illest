const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// ADD USER TO USER TABLE
router
    .route("/")
    // .get(usersController.index)
    .post(usersController.addNewUser);

module.exports = router;
