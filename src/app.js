const express = require("express")
const app = express();
const port = 7777;

app.get("/getAllData",(req,res)=>{
    try{
//logic of DB call
throw new Error("hscgsuy");
res.send("Userdata sent")
    }
    catch(err){
        res.status(500).send("Some error contact to support team");
    }
})


app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("some error")
    }
})

app.listen(port, () => {
    console.log("Server started running on port " + port)
})
