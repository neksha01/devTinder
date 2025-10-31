const express = require("express")
const app = express();
const port = 7777;

// app.use("/user",(req,res,next)=>{
//     console.log("Route Handler 1");
//      //next();
//     res.send("Response 1");
   
// },
// (req,res,next)=>{
//     console.log("Route handler 2");
//     next();
//       //res.send("Response 2");
// },
// (req,res,next)=>{
//     console.log("Route handler 3");
//     //res.send("response 3");
//     // next();
// }
// )

const {adminAuth, userAuth}=require("../middlewares/auth")
// middlewares

app.use("/admin",adminAuth);
//app.use("/user",userAuth);


app.get("/admin/getAllData",(req,res)=>{
    res.send("Admin data sent");    
})

app.get("/admin/deleteData",(req,res)=>{
    res.send("delete data");    
})

app.get("/user",userAuth,(req,res)=>{
    res.send("User data sent");    
})

app.listen(port, () => {
    console.log("Server started running on port " + port)
})
