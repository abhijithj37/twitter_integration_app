const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const User = require("./Model/userModel");
const cookieParser = require("cookie-parser");
const { twitterStrategy } = require("./Config/twitterApiConfig");
const authRoute = require("./routes/authRoute");
const tweetRoute = require("./routes/tweetRoute");

const app = express();

mongoose
  .connect(process.env.CONN_STR)
  .then((conn) => {
    console.log("DB Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let doc = await User.findById(id);
  return done(null, doc);
});

passport.use(twitterStrategy);

app.use("/auth", authRoute);
app.use("/tweet", tweetRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server Started");
});
