const express = require("express");
const userRouter = express.Router();
const { userauth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl age about skills"

userRouter.get("/user/request/received", userauth, async (req, res) => {
    try{
const loggedInUser = req.user;

const connectionRequest = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: "intrested",
}).populate("fromUserId", USER_SAFE_DATA);

res.json({
    message: "data fetched successfully",
    data: connectionRequest,
});
    }catch(err){
   req.statusCode(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userauth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      // return the OTHER user's full object
      return row.fromUserId._id.toString() === loggedInUser._id.toString()
        ? row.toUserId
        : row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



userRouter.get("/feed", userauth, async (req, res) => {
    try{
const loggedInUser = req.user;

const page = parseInt(req.query.page) || 1;
let limit = parseInt(req.query.limit) || 10;
limit = limit>50 ? 50 : limit;
const skip = (page - 1 ) * limit;
const connectionRequests = await ConnectionRequest.find({
    $or: [ { fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
}).select("fromUserId  toUserId");

const hideUsersFromFeed = new Set();

connectionRequests.forEach(( req ) => {
    hideUsersFromFeed.add(req.fromUserId.toString());
    hideUsersFromFeed.add(req.toUserId.toString());
});
const users = await User.find({
 $and: [
    { _id: { $nin: Array.from(hideUsersFromFeed) } },
    { _id: { $ne: loggedInUser._id } },
 ],
})
.select(USER_SAFE_DATA)
.skip(skip)
.limit(limit);
res.json({ data: users });
    } catch(err){
        res.status(400).json({ message: err.message });
    }
});
module.exports = userRouter;