const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const isUserLogin = async (req, res, next) => {
  const loginToken = req.cookies.userLogin;

  if (!loginToken) {
    return res.status(401).json({ message: "Login first to access this page" });
  }

  const decoded = jwt.verify(loginToken, process.env.SECRET_KEY);
  req.user = await User.findOne({ mobile_number: decoded.mobile_number });

  next();
};

module.exports = isUserLogin;
