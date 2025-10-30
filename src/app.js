const express = require("express")
const app = express();
const port = 3000;

//this will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstname:"Neksha",lastname:"Kamboj"})
})

app.post("/user",(req,res)=>{
    //saving data to DB
    res.send("Data successfully send to db")
});

app.delete("/user",(req,res)=>{
    res.send("Deleted successfully");
    
})
// this will match all the http method API calls to /test
app.use("/test", (req, res) => {
    res.send("Server started ")
})



app.listen(port, () => {
    console.log("Server started running on port " + port)
})
