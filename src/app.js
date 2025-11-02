const express = require("express")
const connectDb=require("./config/database")
const app = express();
const port = 7777;
const User=require("./models/user")

app.use(express.json());

app.post("/signup",async(req,res)=>{
    //creating a new instance of user model
    const user=new User(req.body);

    try{
        await user.save();
    res.send("User added Successfully"); 
    } catch(err){
        res.status(400).send("Error saving the user:",err.message);
    }
   
})

// get user by email
// app.get("/user",async(req,res)=>{
//     const userEmail=req.body.email;
//     try{
//         const users=await User.find({email:userEmail})
//         if(users.length===0){
//             res.status(400).send("User not found")
//         }else{
//             res.send(users);
//         }    
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// })

app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    try{
        const users=await User.findOne({email:userEmail})
        if(users.length===0){
            res.status(400).send("User not found")
        }else{
            res.send(users);
        }    
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({})
        if(users.length===0){
            res.status(400).send("User not found")
        }else{
            res.send(users);
        }    
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

// patch user API - updating the data of user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

 try {
    const ALLOWED_UPDATES=[
    "photoUrl","age","password","skills","about"
];

const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
if(!isUpdateAllowed){
    throw new Error("Update not Allowed")
}
if(data?.skills.length>3){
    throw new Error("skills should not be more than 3")
}
        const user = await User.findByIdAndUpdate({ _id: userId }, data);
        console.log(user)
        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send("Update Failed:"+err.message)
    }
})

    //delete user API - deleting a user by its id
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const users = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")
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


