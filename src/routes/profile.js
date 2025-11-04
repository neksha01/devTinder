const express=require("express");
const{userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validation")
const validator=require("validator");

const profileRouter=express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
   const user=req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser=req.user;

        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);

     await   loggedInUser.save();

        res.json({
            message:`${loggedInUser.firstName} , your profile updated successfully`,
            data:loggedInUser
        })
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    //validate if user logged in  or not
    try{
        const loggedInUser=req.user;
        const {password}=req.body;
        if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a strong password");
        }
        
        loggedInUser.password=password;
    
        await loggedInUser.save();
        
        res.json({
            message:"Password updated successfully",
            data:loggedInUser
        })
    }catch(err){
        res.status(400).send("ERROR:"+err.message)
    }
})

module.exports=profileRouter;