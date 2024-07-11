const express = require("express")
require('dotenv').config()
const cors = require("cors")
const mongoose = require("mongoose")
//const cookieParser = require("cookie-parser")
const {db_name} = require("./constants.js")
const {BASE_PATH} = require("./constants.js")
const {signUpController,loginController,accountController} = require("./controllers/user.controller.js")
const {verifyToken} = require("./middlewares/authMiddlware.js")
const upload = require("./middlewares/multer.middleware.js")
const {profileController} = require("./controllers/profile.controller.js")
const {addProductController} = require("./controllers/product.controller.js")
const {getAllProductController} = require("./controllers/product.controller.js")
const {cartItemController} = require("./controllers/cart.controller.js");
const {getCartItemsIdsController} = require("./controllers/cart.controller.js")
const {deleteCartItemController} = require("./controllers/cart.controller.js")
const app = express();
// const bodyParser = require("body-parser");
app.use(cors())
// app.use()
app.use(express.json())
// app.use(bodyParser.json());
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
//app.use(cookieParser())



    mongoose.connect(`${process.env.db_URL}/${db_name}`).then(()=>{
        console.log("db connected")
       })
       .catch((err)=>{console.log(err)})
      
//register api
app.post(`${BASE_PATH}/user/register`,signUpController)

//login api
app.post(`${BASE_PATH}/user/login`,loginController)

//user account api
app.get(`${BASE_PATH}/user/account`,verifyToken, accountController)

//user profile api
app.post(`${BASE_PATH}/user/uploadProfile`,verifyToken,upload.single("profilePicture"),profileController)

//product image api
app.post(`${BASE_PATH}/products`,upload.single("product-image"),addProductController)

//product api
app.post(`${BASE_PATH}/products/:dataType`,verifyToken,getAllProductController)

//add userId and product id into cart collection 
app.post(`${BASE_PATH}/cart/product`,verifyToken,cartItemController)

//get cart items data
app.get(`${BASE_PATH}/cart/items`,verifyToken,getCartItemsIdsController)

//delete item from cart
app.delete(`${BASE_PATH}/cart/delete-item/:productId`,verifyToken,deleteCartItemController)
app.listen(process.env.PORT,()=>{
    console.log("server started")
});

