const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");

router.post("/register", async (req, res) => {
  try {
    const { mobile_number, name, society, password, cpassword } = req.body;

    if (!mobile_number || !name || !society || !password || !cpassword) {
      return res.status(401).json({ message: "All fields are mandatory" });
    }

    if (password !== cpassword) {
      return res
        .status(401)
        .json({ message: "Password and Confirm Password not matching" });
    }

    const userCheckNo = await User.findOne({ mobile_number: mobile_number });
    if (userCheckNo) {
      return res
        .status(401)
        .json({ message: "Already registered please Login" });
    }

    await User.create({
      mobile_number,
      name,
      society,
      password,
    });

    res.status(201).json({ message: "Registration Success" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
