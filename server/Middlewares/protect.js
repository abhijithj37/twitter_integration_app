const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const token = cookies.jwt;
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
};
