const adminauth = (req,res,next)=>{
    console.log("admin auth getting checked");
    const token="xyx";
    const isadmin=token=="xyx";
    if(!isadmin){
        res.status(401).send("you are not admin")
    }else{
        next();
    }
};
const userauth = (req,res,next)=>{
    console.log("user auth getting checked");
    const token="xyx";
    const isuser=token=="xyx";
    if(!isuser){
        res.status(401).send("you are not user")
    }else{
        next();
    }
};
module.exports={
    adminauth,
    userauth,
};