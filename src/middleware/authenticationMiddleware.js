const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // Use your secret key here

module.exports = function authenticationMiddleware(req, res, next) {
  const cookie = req.cookies;
  if (!cookie) {
    return res.status(401).json({ message: "no cookie found" });
  }

  const token = cookie.token;
  if (!token) {
    return res.status(401).json({ message: "no token found" });
  }

  jwt.verify(token, secretKey, (error, payload) => {
    if (error) return res.status(401).json({ message: "invalid token" });
    req.user = payload.user;
    next();
  });
};
