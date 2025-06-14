const express = require('express')
const app = express();
const {adminauth, userauth} = require("./middlewares/auth");
app.use("/admin",adminauth);
app.post("/user/login",(req,res)=>{
res.send("user logged in");
});
app.get("/user/data",userauth,(req,res)=>{
    res.send("user sent data");
});
app.get("/admin/getdata",(req,res)=>{
    res.send("get data");
});
app.get("/admin/delete/user",(req,res)=>{
    res.send("deleted user");
});
app.listen(7777,()=>{
    console.log("listening on port 7777");
});