const validator=require("validator")

const validationSignUp=(req)=>{
    const {firstName,lastName,email,password}=req.body;

    if(!firstName||lastName){
        throw new Error("Enter a valid firstname or lastname")
    } else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
}

const validateEditProfileData=(req)=>{
    const allowedEditFields=[
        "firstName",
        "lastName",
        "about",
        "photoURL",
        "gender",
        "age",
        "skills"
    ]

   const isEditAllowed= Object.keys(req.body).every(
    (fields)=>allowedEditFields.includes(fields)
    );

    return isEditAllowed;
}

module.exports={
    validationSignUp,
    validateEditProfileData
}