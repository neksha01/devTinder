const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
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
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Current Password is not strong:"+value)
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value) {
            if (!["Male", "female", "others"].includes(value)) {
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
        default:"https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo Url:"+value)
            }
        }
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true
})

// const userModel=mongoose.model("User",userSchema)

// module.exports=userModel;

// for jwt
    userSchema.methods.getjwt = async function () {
    const user = this;
    const token = await jwt.sign({ _id: this._id }, "DEV@TINDER09", { expiresIn: "1d" })

    return token;
}

// for password validation
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isValidPassword;

}
module.exports=mongoose.model("User",userSchema);