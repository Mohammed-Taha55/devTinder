const express = require('express')
const app = express();
app.get(
    "/user",
    (req,res,next)=>{
    console.log("handling the user router 1!!");
    next();
// res.send("1st response")
},
(req,res,next)=>{
    console.log("handling the user router 2!!");
    next()
},
(req,res,next)=>{
console.log("handling router user 3!!");
res.send("3rd response");
}
);
app.listen(7777,()=>{
    console.log("listening on port 7777");
});