const express = require('express');
const ConnectDB = require("./config/database")
const app = express();
const User = require("./models/user");
app.post("/signup",async(req,res)=>{
const user = new User({
    firstName:"kai",
    lastName:"hiwatari",
    emailId:"kai@123.com",
    password:"kai123"
});
try{
await user.save();
res.send("user added successfully")
} catch(err){
    res.status(404).send("error saving user data"+err.message)
}
});
ConnectDB()
.then(()=>{
console.log("DataBase successfully connected ");
app.listen(7777,()=>{
    console.log("listening on port 7777");
});
})
.catch((err)=>{
    console.error("failed connecting DB");
});
