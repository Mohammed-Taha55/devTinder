const express = require("express");
const profilerouter = express.Router(); 
const { userauth } = require("../middlewares/auth");
profilerouter.get("/profile", userauth, async (req, res)=>{
try{
const user = req.user;
res.send(user);
}catch(err){

    res.status(400).send("ERROR : " + err.message);
}
});
module.exports = profilerouter;