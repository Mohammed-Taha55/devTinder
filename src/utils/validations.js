const validator = require ("validator");
// const { all } = require("../routes/auth");
const validateSingupData = (req)=>{
const{firstName,lastName,emailId,password}=req.body;
if(!firstName || !lastName){
    throw new Error("name is not valid!");
}
else if(!validator.isEmail(emailId)){
    throw new Error("email is not valid!");
}
else if(!validator.isStrongPassword(password)){
    throw new Error("enter strong password!");
}
};
const validateEditprofiledata = (req)=>{
const allowededitfield = [
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "skills",
    "photoUrl",
    "age", 
    "about",
];
const iseditallowed = Object.keys(req.body).every((field)=>
allowededitfield.includes(field)
);
return iseditallowed;
};
module.exports={
    validateSingupData,
    validateEditprofiledata,
};