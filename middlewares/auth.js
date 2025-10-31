const adminAuth=(req,res,next)=>{
    console.log("Admin auth ");
    const token="xyz";
    const isAdminAuthorized= token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized admin");
    }  
    else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    console.log("User auth ");
    const token="xy";
    const isUserAuthorized= token==="xyz";
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized user");
    }  
    else{
        next();
    }
}

module.exports={
    adminAuth,
    userAuth
}