const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_ACC_SECRET_TOKEN;
const client = require("twilio")(accountSid, authToken);

router.post("/send/otp", async (req, res) => {
  client.messages
    .create({
      body: `Here is your verification OTP code ${req.body.otp}.`,
      from: "(762) 246-0992",
      to: "+91 75066 31677",
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));

  const loginUser = await User.findOne({
    mobile_number: req.body.mobile_number,
  });

  loginUser.otp = req.body.otp;
  await loginUser.save({ validateBeforeSave: false });

  return res.status(201).json({ message: "OTP sended success" });
});

router.post("/verify/otp", async (req, res) => {
  try {
    if (!req.body.otp) {
      return res.status(401).json({ message: "please provide OTP code" });
    }

    const loginUser = await User.findOne({
      mobile_number: req.body.mobile_number,
    });

    if (req.body.otp !== loginUser.otp) {
      return res.status(401).json({ message: "Invalid OTP code" });
    }

    loginUser.otp = undefined;
    await loginUser.save();

    return res.status(201).json({ message: "OTP verified" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
