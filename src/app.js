const express = require('express');

const ConnectDB = require("./config/database")

const app = express();

const cookieParser = require('cookie-parser');
const cors = require("cors");
app.use(cookieParser());


app.use(cors({
    origin: ["http://localhost:5173",
             "https://16.171.64.98"
    ],
     credentials: true,
})); 
app.use(express.json());


const authrouter = require("./routes/auth");
const profilerouter = require("./routes/profile");
const requestrouter = require("./routes/requests");
const userRouter = require('./routes/user');

app.use("/api", authrouter);
app.use("/api", profilerouter);
app.use("/api", requestrouter);
app.use("/api", userRouter);


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
