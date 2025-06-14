const express = require('express')
const app = express();
app.use("/get/data",(req,res)=>{
    try{
    throw new Error("errrorrr")
    res.send("user data")
    }
    catch(err){
        if(err){
            res.status(501).send("please get lost");
        }
    }
    
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("this is error");
    }
})
app.listen(7777,()=>{
    console.log("listening on port 7777");
});