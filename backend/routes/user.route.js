const { Router } = require("express");
const {UserModel} = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      if (err) {
        res.send("Error Occurred, Please try again 1");
      } else {
        const newUser = new UserModel({ email, password: hash });
        await newUser.save();
        res.send("Account created successfully");
      }
    });
  } catch (err) {
    res.send("Error Occurred, Please try again");
  }
});

module.exports = { userRouter };
