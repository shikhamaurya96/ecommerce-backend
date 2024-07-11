const {uploadOnCloudinary} = require("../utils/cloudinary.js")
const productModel = require("../db/product.model.js")
exports.addProductController = async(req,res)=>{
    const filePath = req.file.path;
     //console.log(req.file.path)
     //cloudinary file url
    const cloudinaryFilePath= await uploadOnCloudinary(filePath, "products");
    //console.log("cloudinary url",cloudinaryFilePath.url)
     //res.status(200).send("file uploaded on cloudinary")
     //console.log(req.body.name)
     const productData = {
        imageUrl:cloudinaryFilePath.url,
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        quantity:req.body.quantity,
        gender:req.body.gender,
        price:req.body.price
     }
     const data = new productModel(productData);
     const result = await data.save();
     res.status(200).send(result)
}
exports.getAllProductController = async(req,res)=>{
    const productType = req.params.dataType;
    
    console.log(productType)
    if(productType==="all"){
    const allProducts = await productModel.find({})
    return res.status(200).send(allProducts)
    }
    else if(productType==="men"||productType==="women"){
        const products = await productModel.find({gender:productType});
        return res.status(200).send(products)
    }
    else if(productType==="shirt"||productType==="pant"||productType==="jwellery"||productType==="footwear"){
        const products = await productModel.find({category:productType});
        return res.status(200).send(products)
    }
    
}