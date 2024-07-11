const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
     username:{
        type:String,
        required:true
     },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:false
    }
    
});
const userModel = mongoose.model("user",userSchema);
module.exports= userModel