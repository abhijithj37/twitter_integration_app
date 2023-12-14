const User = require("../Model/userModel");
const TwitterStrategy = require("passport-twitter").Strategy;
const { TwitterApi } = require("twitter-api-v2");

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  async function (_, __, profile, cb) {
    try {
      let user = await User.findOne({ twitterId: profile.id });

      if (!user) {
        user = new User({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          profileImageUrl: profile.photos[0].value,
          coverPhoto: profile._json.profile_banner_url,
          bio: profile._json.description,
          joinedDate: new Date(profile._json.created_at),
        });

        await user.save();
      } else {
        user.displayName = profile.displayName;
        user.profileImageUrl = profile.photos[0].value;
        user.coverPhoto = profile._json.profile_banner_url;
        user.bio = profile._json.description;
        user.joinedDate = new Date(profile._json.created_at);

        await user.save();
      }

      return cb(null, user);
    } catch (error) {
      console.error(error);
      return cb(error);
    }
  }
);

const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
});

module.exports = { twitterStrategy, client };
