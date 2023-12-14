const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

module.exports = {

  authenticate: (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "None",
      secure: true,
    });

    res.redirect("http://127.0.0.1:5173");
  },

  getUser: async (req, res) => {
    const user = await User.findById(req.userId);
    res.status(200).json({ user });
  },

  logout: (req, res) => {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  },
  
};
