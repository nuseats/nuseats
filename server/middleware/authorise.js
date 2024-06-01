const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res.status(403).json({ msg: "authorization denied" });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};