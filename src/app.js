const express = require("express");
const connectDb = require("./config/database");
const app = express();
const port = 7777;

const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)

connectDb()
  .then(() => {
    console.log("Database connection established...");
    app.listen(port, () => {
      console.log("Server started running on port " + port);
    });
  })
  .catch((err) => {
    console.log("Database is not connected!!!!!");
  });
