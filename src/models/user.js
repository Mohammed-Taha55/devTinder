const validator = require("validator");
const mongoose = require('mongoose');
const userschema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:10,
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
        validate(value){
            if(!["male","female","other"].includes(value)){
             throw new Error("gender is not valid")  
            }
        }
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
module.exports =  mongoose.model("User",userschema);