const express = require('express');

const ConnectDB = require("./config/database")

const app = express();

const cookieParser = require('cookie-parser');
const cors = require("cors");


app.use(cors({
    origin: "http://localhost:5173/",
     credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const authrouter = require("./routes/auth");
const profilerouter = require("./routes/profile");
const requestrouter = require("./routes/requests");
const userRouter = require('./routes/user');

app.use("/", authrouter);
app.use("/", profilerouter);
app.use("/", requestrouter);
app.use("/", userRouter);


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
