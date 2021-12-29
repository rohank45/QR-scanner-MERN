const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  res.clearCookie("userLogin");
  res.status(201).json({ message: "Logout Success" });
});

module.exports = router;
