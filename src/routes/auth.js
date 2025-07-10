const express = require("express");
const authrouter = express.Router();
const { validateSingupData } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require ("bcrypt");

authrouter.post("/signup",async(req,res)=>{

try{
//validation of data
    validateSingupData(req);
    const { firstName, lastName, emailId, password }=req.body;
//encrypt the password
    const passwordHash = await bcrypt.hash(password,10);
console.log(passwordHash)
const user = new User ({
    firstName,
    lastName,
    emailId,
    password:passwordHash
});
//creting a new instance of the user model
const savedUser = await user.save();
const token = await savedUser.getJWT();

//add and send send response to the user
res.cookie("token", token, {
    expires: new Date(Date.now() + 8 * 3600000),
});


res.json({message: "user added successfully!", data: savedUser})
} catch(err){

    res.status(400).send("ERROR:"+err.message)
}
});
authrouter.post("/login", async(req, res )=>{
    try{
        const{ emailId, password }=req.body;
        const user = await User.findOne({ emailId: emailId });
        if(!user){
            throw new Error("wrong email or password!!")
        }
    const ispasswordvalid = await user.validatePassword(password)
    if(ispasswordvalid){
//jwt tocken
const token = await user.getJWT();

//add and send send response to the user
res.cookie("token", token, {
    expires: new Date(Date.now() + 8 * 3600000),
});

res.send(user);
    }
else{
    throw new Error("wrong email or password!!");
}
 }catch(err){

    res.status(400).send("ERROR:"+err.message)
}
});
authrouter.post("/logout", async(req, res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("get lost!!");
});

module.exports = authrouter;