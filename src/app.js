const express = require('express');

const ConnectDB = require("./config/database")

const app = express();

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser())

const authrouter = require("./routes/auth");
const profilerouter = require("./routes/profile");
const requestrouter = require("./routes/requests");

app.use("/", authrouter);
app.use("/", profilerouter);
app.use("/", requestrouter);


ConnectDB()
.then(()=>{
console.log("DataBase successfully connected ");
app.listen(7777,()=>{
    console.log("listening on port 7777");
});
})
.catch((err)=>{
    console.error("failed connecting DB"+err.message);
});
