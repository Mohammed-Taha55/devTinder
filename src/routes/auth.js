const express = require("express");
const authrouter = express.Router();
const { validateSingupData } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require ("bcrypt");

authrouter.post("/signup",async(req,res)=>{

try{
//validation of data
    validateSingupData(req);
    const { firstName, lastName, emailId, password }=req.body;
//encrypt the password
    const passwordHash = await bcrypt.hash(password,10);
console.log(passwordHash)
const user = new User ({
    firstName,
    lastName,
    emailId,
    password:passwordHash
});
//creting a new instance of the user model
await user.save();

res.send("user added successfully")
} catch(err){

    res.status(400).send("ERROR:"+err.message)
}
});
authrouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Step 1: Check if user exists
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Step 2: Validate password
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Step 3: Generate token
        const token = await user.getJWT();

        // Step 4: Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
        });

        // Step 5: Send user response
        res.status(200).json({ message: "Login successful", user });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});
authrouter.post("/logout", async(req, res)=>{
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("get lost!!");
});

module.exports = authrouter;