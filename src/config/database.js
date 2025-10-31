const mongoose=require("mongoose")

const connectDb=async ()=>{
    await mongoose.connect("mongodb+srv://neksha01_db_user:NjKgPbdo806fE3cf@cluster0.rxwb2vq.mongodb.net/devTinder");
}

module.exports=connectDb;

