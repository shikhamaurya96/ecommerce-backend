const cartModel = require("../db/cart.model.js");
const productModel = require("../db/product.model.js")
exports.cartItemController = async(req,res)=>{
    try{
    const myProductId = req.body.productId;
    
        //store user id and their respective product id in mongodb  
    const resp =  new cartModel({userId:req.userId,productId:myProductId})
     
      const data = await resp.save();
      res.status(200).send(data)
    }
    catch(err){
        res.status(500).send({error:err.message})
    }
}
exports.getCartItemsIdsController = async(req,res)=>{
    try{
        //get all data(userId,productId) of a perticular userId
    const resp = await cartModel.find({userId:req.userId})
    //get array of productIds of a perticular userId
    const ids = resp.map((el)=>{
        const myProductId = el.productId;
        return myProductId;
    })
    //get product data of its product id
    const productsData = await productModel.find({'_id':ids})
    res.status(200).send(productsData)
    }
    catch(err){
        res.status(500).send({error:err.message})
    }
}

//delete item from cart
exports.deleteCartItemController = async(req,res)=>{
    try{
        const productId=  req.params.productId;
        const resp = await cartModel.deleteOne({productId:productId})
        res.status(200).send(resp)
      }
      catch(err){
        res.status(500).send({error:err.message})
      }
}
  
