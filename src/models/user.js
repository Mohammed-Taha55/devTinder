const validator = require("validator");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userschema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("invalid email:"+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
           validate(value){
            if(!validator.isStrongPassword(value)){
                throw new error("weak password:"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a value gender type`,
        },
        // validate(value){
        //     if(!["male","female","other"].includes(value)){
        //      throw new Error("gender is not valid")  
        //     }
        // },
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQis4SmUCmjarp1QM222Yy5FhT8lTtpixevg&s",
           validate(value){
            if(!validator.isURL(value)){
                throw new error("invalid photo:"+value);
            }
        }
    },
    about:{
        type:String,
        default:"this is default",
    },
    skills:{
        type:[String],
    },
},
{
    timestamps:true,
}
);

userschema.methods.getJWT = async function (){
    const user = this;
  const token = await  jwt.sign({ _id: user._id }, "DEV@Tinder$", {
    expiresIn: "1d",
});
return token;
}

userschema.methods.validatePassword = async function (passwordinputbyuser) {
    const user = this;
    const passwordHash = user.password;
    const ispasswordvalid = await bcrypt.compare(
        passwordinputbyuser, 
        passwordHash
    );
    return ispasswordvalid;
};

module.exports =  mongoose.model("User",userschema);