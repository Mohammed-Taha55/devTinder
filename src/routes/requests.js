const express = require("express");
const requestrouter = express.Router();
const { userauth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");
requestrouter.post(
    "/request/send/:status/:toUserId", 
    userauth, 
    async (req, res) => {
try{
const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;

const allowedStatus = ["ignored", "intrested"];
if(!allowedStatus.includes(status)){
    return res
    .status(400)
    .json({message: "invalid status type " + status});
}

const toUser = await User.findById(toUserId);
if(!toUser){
 return res.status(400).json( {message: "user does not exist"});
}

const existingConnectionRequest = await ConnectionRequest.findOne({
    $or: [
        { fromUserId, toUserId },
        { fromUserId, toUserId, toUserId: fromUserId },
    ],
});
if(existingConnectionRequest){
    return res
    .status(400)
    .send({ message: "connection request already exsist!!"});
}
const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId,
    status,
});
const data = await connectionRequest.save();
res.json({
    message: req.user.firstName + " is " + status + " in " + toUser.firstName,
    data,
});
}
catch(err){
    res.status(400).send("ERROR" , + err.message);
    
}

});
module.exports = requestrouter;