const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
             }
})
const cartModel = mongoose.model("cart",cartSchema)
module.exports = cartModel;