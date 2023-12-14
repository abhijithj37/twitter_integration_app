const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../Controllers/authController");
const { protect } = require("../Middlewares/protect");

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/", session: true }),
  authController.authenticate
);

router.get("/user", protect, authController.getUser);

router.get("/logout", protect, authController.logout);

module.exports = router;
