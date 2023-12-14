const express = require("express");
const router = express.Router();
const tweetController = require("../Controllers/tweetController");
const { protect } = require("../Middlewares/protect");

router.get("/", protect, tweetController.getTweets);

router.post("/", protect, tweetController.postTweet);

router.delete("/:id", protect, tweetController.deleteTweet);

module.exports = router;
