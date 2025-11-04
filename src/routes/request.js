const express=require("express");
const{userAuth}=require("../middlewares/auth")

const requestRouter=express.Router();


requestRouter.post("/sendConnectionRqst",userAuth,async(req,res)=>{
    //sending a connection request
    console.log("sending a connection request");

res.send("Connection request sent!"); 
})


module.exports=requestRouter;
