const express = require("express");
const router = express.Router();
const isUserLogin = require("../middleware/isUserLogin");

router.get("/profile", isUserLogin, (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
