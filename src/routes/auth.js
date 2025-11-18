const express=require("express");
const { validationSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter=express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validationSignUp(req);

    const { firstName, lastName, email, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    //console.log(passwordHash);

    //creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //create a JWT token
      const token = await user.getjwt();
     // console.log(token);

      //add a token to cookie and send the response back to  the user
      res.cookie("token", token, {
  httpOnly: true,
  secure: false,       // must be false on localhost
  sameSite: "lax",     // required for cross-origin cookies
  maxAge: 8 * 3600000, // same as 8 hours
});
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{expires:new Date(Date.now())})

  res.send("Logout Successfull");
});

module.exports=authRouter;