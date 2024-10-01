const userModel = require("../models/user-models");
const bcrypt = require("bcrypt");
const { generatoToken } = require("../utils/generateToken");

async function registerUser(req, res) {
  try {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("user already registed");
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          res.status(500).send("404");
        } else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generatoToken(user);
          res.cookie("token", token);
          res.redirect("shop");
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function loginUser(req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) return req.flash("Email or Password wrong");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generatoToken(user);
      res.cookie("token", token);
      res.redirect("shop");
    } else {
      return req.flash("Email or Password wrong");
      res.redirect("/");
    }
  });
}

function logout(req, res) {
  res.cookie("token", "");
  res.redirect("/");
}

module.exports.loginUser = loginUser;
module.exports.registerUser = registerUser;
module.exports.logout = logout;
