const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Not a valid gender (Male , Female and other)")
            }
        }
    },
    about:{
        type:String,
        default:"This is default about of a user"
    },
    photoURL:{
        type:String,
        default:"https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})

// const userModel=mongoose.model("User",userSchema)

// module.exports=userModel;

module.exports=mongoose.model("User",userSchema);