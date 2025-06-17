const express = require('express');
const ConnectDB = require("./config/database")
const app = express();
const User = require("./models/user");
app.use(express.json());
app.post("/signup",async(req,res)=>{
const user = new User(req.body);
try{
await user.save();
res.send("user added successfully")
} catch(err){
    res.status(404).send("error saving user data"+err.message)
}
});
app.get("/user",async(req,res)=>{
    const userlastname = req.body.emailId;
    try{
        const users = await User.find({emailId:userlastname});
        if(users.length==0){
            res.status(404).send("user not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(500).send("something went wrong")
    }
})
app.get("/feed",async(req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong");
    }
})
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted auccessfully");
    }
    catch(err){
     res.status(400).send("something went wrong");
    }
});
app.patch("/user/:userId",async(req,res)=>{
const userId =req.params?.userId;
const data = req.body;

try{
    const Allowed_updates =[
    "photoUrl","about","gender","age","userId","skills","lastName"
]
const isupdateallowed = Object.keys(data).every((k)=>
Allowed_updates.includes(k)
);
if(!isupdateallowed){
   throw new Error("update not allowed");
}
if(data?.skills.length>10||data?.skills.length<=2){
    throw new Error("skills less or more")
}
    const user = await User.findByIdAndUpdate({_id:userId},data,{
        returnDocument:"after",
        runValidators:true,
    });
    console.log(user);
    res.send("user updated");
}catch(err){
    res.status(400).send("update failed" + err.message);
}
})
ConnectDB()
.then(()=>{
console.log("DataBase successfully connected ");
app.listen(7777,()=>{
    console.log("listening on port 7777");
});
})
.catch((err)=>{
    console.error("failed connecting DB"+err.message);
});
