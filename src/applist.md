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

userRouter.get("/user/connections", userauth, async (req, res) =>{
    try{
const loggedInUser = req.user;
const connectionRequests = await ConnectionRequest.find({
    $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },

    ],
})
  .populate("fromUserId", USER_SAFE_DATA )
  .populate("toUserId", USER_SAFE_DATA);
const data = connectionRequests.map((row) => {
if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
   return row.fromUserId
 }
 return row.toUserId;
 });
res.json({ data })
    } catch(err){
res.status(400).send({ message: err.message })
    }
});