const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("userLogin");
    res.status(201).json({ message: "Logout Success" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
