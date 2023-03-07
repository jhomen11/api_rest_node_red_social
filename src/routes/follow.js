const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { saveFollow,unFollow, getFollowing, getFollowers } = require("../controllers/follow");



router.get("/follow/following/:id?/:page?", auth, getFollowing)
router.get("/follow/followed/:id?/:page?", auth, getFollowers)
router.post("/follow/save", auth, saveFollow)
router.delete("/follow/unfollow/:id", auth, unFollow)

module.exports = router