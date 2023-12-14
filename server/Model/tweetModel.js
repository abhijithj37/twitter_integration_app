const mongoose = require('mongoose');

 const tweetSchema = new mongoose.Schema({
  tweetId: {
    type: String,
    required: true,
    unique: true,
  },
  tweetText:String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
