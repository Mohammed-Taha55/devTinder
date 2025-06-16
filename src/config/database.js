const mongoose = require("mongoose");
const ConnectDB = async()=>{
    await mongoose.connect(
       "mongodb+srv://mohammedtaha10683:Y0nGbVH9y2D1HR1H@cluster1.jw822lb.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=Cluster1/DevTinder"
    );
};
module.exports = ConnectDB;
