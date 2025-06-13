const express = require('express')
const app = express();
app.get("/user",(req,res)=>{
res.send({first:"taha",last:"hero"})
});
app.use("/test",(req,res)=>{
    res.send("hello from test!");
});
app.post("/user",(req,res)=>{
    //saving data db logic
    res.send("data succesfully saved in database")
})
app.delete("/user",(req,res)=>{
    res.send("succesfully deleted")
})
app.patch("/user",(req,res)=>{
    res.send("this is patch")
})
app.listen(7777,()=>{
    console.log("listening on port 7777");
});