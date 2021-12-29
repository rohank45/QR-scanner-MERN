const express = require("express");
const router = express.Router();
const User = require("../../model/userSchema");
const isUserLogin = require("../../middleware/isUserLogin");

router.post("/exit", isUserLogin, async (req, res) => {
  try {
    const { tokenId, user_name, society_name, exit, time } = req.body;

    if (!tokenId || !user_name || !society_name || !exit || !time) {
      return res.status(401).json({ message: "All fields are mandatory" });
    }

    const log = {
      tokenId,
      user_name,
      society_name,
      entry: exit,
      time,
    };

    const loginUser = await User.findOne({
      mobile_number: req.body.mobile_number,
    });

    loginUser.log.unshift(log);
    await loginUser.save({ validateBeforeSave: false });

    res.status(201).json({ message: "Exit success" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
