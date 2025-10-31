const express = require("express")
const connectDb=require("./config/database")
const app = express();
const port = 7777;
const User=require("./models/user")

app.post("/signup",async(req,res)=>{
    //creating a new instance of user model
    const user=new User({
        firstName:"Arun",
        lastName:"Kamboj",
        email:"arun@123.com",
        password:"arun23"
    });

    try{
        await user.save();
    res.send("User added Successfully"); 
    } catch(err){
        res.status(400).send("Error saving the user:",err.message);
    }
   
})

connectDb()
.then(()=>{
    console.log("Database connection established...");   
    app.listen(port, () => {
    console.log("Server started running on port " + port)
});
})
.catch((err)=>{
    console.log("Database is not connected!!!!!");  
})


