const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");

router.post("/login", async (req, res) => {
  try {
    const { mobile_number, password } = req.body;

    if (!mobile_number || !password) {
      return res.status(401).json({ message: "All fields are mandatory" });
    }

    const loginUser = await User.findOne({ mobile_number: mobile_number });
    if (!loginUser) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials Please Register" });
    }

    const checkPassword = await bcrypt.compare(password, loginUser.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const loginToken = jwt.sign({ mobile_number }, process.env.SECRET_KEY);
    res.cookie("userLogin", loginToken, {
      expires: new Date(Date.now() + 2592000000),
    });

    res.status(201).json({ message: "Login Success" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
