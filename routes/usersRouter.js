const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const { isLoggedin } = require("../middlewares/isLoggedin");

router.get("/user", function (req, res) {
  res.send("hello world");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isLoggedin, logout);

module.exports = router;
