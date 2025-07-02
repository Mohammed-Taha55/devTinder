const express = require("express");
const requestrouter = express.Router();
const { userauth } = require("../middlewares/auth");
requestrouter.post("/sendConnectionRequest", userauth, async (req, res) => {
    const user = req.user;
    //sending a connection request
    console.log("sending a connection request");
    res.send(user.firstName + " sent the connection request!");
});
module.exports = requestrouter;