const express = require("express");
const profilerouter = express.Router(); 
const { userauth } = require("../middlewares/auth");
const { validateEditprofiledata } = require("../utils/validations");
profilerouter.get("/profile/view", userauth, async (req, res)=>{
try{
const user = req.user;
res.send(user);
}catch(err){

    res.status(400).send("ERROR : " + err.message);
}
});
profilerouter.patch("/profile/edit", userauth, async (req, res)=>{
try{
if(!validateEditprofiledata(req)) {
    throw new Error("invalid edit request")
}
const loggedinuser = req.user;

Object.keys(req.body).forEach((key) => (loggedinuser[key] = req.body[key]));
await loggedinuser.save();
res.json({
 message: `${loggedinuser.firstName}, your update was successfull`,
 data: loggedinuser,
});
}catch(err){
    res.status(400).send("ERROR : " + err.message);
}
});
profilerouter.patch("/profile/password", userauth, async (req, res)=>{
    
})
module.exports = profilerouter;