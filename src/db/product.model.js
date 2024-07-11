const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
        }
        ,
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
const productModel = mongoose.model("product",productSchema);
module.exports = productModel