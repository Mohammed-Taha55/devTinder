const express = require('express')
const app = express();
app.use("/",(req,res)=>{
    res.send("hello from server!");
});
app.use("/test",(req,res)=>{
    res.send("hello from test!");
});
app.use("/use",(req,res)=>{
    res.send("this is use!");
});
app.listen(7777,()=>{
    console.log("listening on port 7777");
});