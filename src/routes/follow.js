const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { saveFollow } = require("../controllers/follow");



router.post("/follow/save", auth, saveFollow)

module.exports = router