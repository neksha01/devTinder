const express=require("express");
const{userAuth}=require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User=require("../models/user")

const requestRouter=express.Router();


requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
    try{

   const fromUserId=req.user._id;
   const toUserId=req.params.userId;
   const status=req.params.status;

   const toUser= await User.findById(toUserId);
   if(!toUser){
    return res.status(400).send("User not Found")
   }

   const allowedStatus=["interested","ignored"];

   //status validation
   if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"Invalid status type: " + status})
   }

   //existing request validation
   const existingConnectionRequest= await ConnectionRequestModel.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
    ]
   })

   if(existingConnectionRequest){
    return res.status(400).json({message:"Connection Request already exists!!!"})
   }


   const connectionRequest=new ConnectionRequestModel({
    fromUserId,
    toUserId,
    status
   })
    
   const data=await connectionRequest.save();
   res.json({
    message:"connection request sent successfully",
    data
   })
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
   

})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{

    const loggedInUser=req.user;
    const {status,requestId}=req.params;

    // validate status
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
        return res.status(400).send("Status not allowed");
    }

    //check whether request present or not
    const connectionRequest=await ConnectionRequestModel.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested"
    })

    if(!connectionRequest){
        return res.status(400).json({message:"connection request not found"})
    }

    connectionRequest.status=status;

    const data=await connectionRequest.save();

    res.json({message:`Connection Request : ${status}`,data})

})


module.exports=requestRouter;
