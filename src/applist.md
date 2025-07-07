# Dev 
# auth/router:
post/signup
post/login
post/logout

# profile/router:
get/profile/view
patch/profile/edit
patch/profile/password

# connection/request/router:
post/request/:status/:userId
post/request/review/accepted/:request
post/request/review/rejected/:request

# user/router:
get/user/connections
get/user/requests
get/feed-gets you the profile of other users 

status: ignore,  intrested, accepted rejected

authrouter.post("/login", async(req, res )=>{
    try{
        const{ emailId, password }=req.body;
        const user = await User.findOne({ emailId: emailId });
        if(!user){
            throw new Error("invalid credentials")
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
    throw new Error("invalid credentials");
}
 }catch(err){

    res.status(400).send("ERROR:"+err.message)
}
});