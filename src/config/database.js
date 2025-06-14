const mongoose = require("mongoose");
const ConnectDB = async()=>{
    await mongoose.connect(
       "mongodb+srv://mohammedtaha10683:UoGfvDDO9Gkxd4iA@cluster0.vpt4x5s.mongodb.net/sportsclub?retryWrites=true&w=majority&appName=Cluster0/DevTinder"
    );
};
module.exports = ConnectDB;