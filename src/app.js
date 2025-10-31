const express = require("express")
const app = express();
const port = 7777;

app.use("/user",(req,res,next)=>{
    console.log("Route Handler 1");
     //next();
    res.send("Response 1");
   
},
(req,res,next)=>{
    console.log("Route handler 2");
    next();
      //res.send("Response 2");
},
(req,res,next)=>{
    console.log("Route handler 3");
    //res.send("response 3");
    // next();
}
)


app.listen(port, () => {
    console.log("Server started running on port " + port)
})
