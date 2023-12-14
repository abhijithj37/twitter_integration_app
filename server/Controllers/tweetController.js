const { client } = require("../Config/twitterApiConfig");
const Tweet = require("../Model/tweetModel");

module.exports = {

  postTweet: async (req, res) => {
    const rwClient = client.readWrite;
    let tweetText = req.body.tweetText;
    try {
      const tweet = await rwClient.v2.tweet(tweetText);

      const newTweet = await Tweet.create({
        tweetId: tweet.data.id,
        tweetText,
      });
      res.status(201).json({ newTweet });
    } catch (error) {
      res.sendStatus(500);
    }
  },

  getTweets: async (req, res) => {
    try {
      const tweets = await Tweet.find().sort({ _id: -1 });
      res.status(200).json({ tweets });
    } catch (error) {
      res.sendStatus(500);
    }
  },

  deleteTweet: async (req, res) => {
    try {
      await client.v2.deleteTweet(req.params.id);
      await Tweet.deleteOne({ tweetId: req.params.id });
      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500);
    }
  },
  
};
