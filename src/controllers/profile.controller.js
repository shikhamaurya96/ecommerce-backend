const {uploadOnCloudinary} = require("../utils/cloudinary.js")
const userModel = require("../db/user.model");
exports. profileController = async(req,res)=>{
    console.log("my profile path")
    //local file path
    const filePath = req.file.path;
     console.log(req.file.path)
     //cloudinary file url
    const cloudinaryFilePath= await uploadOnCloudinary(filePath, "profile");
    console.log("cloudinary url",cloudinaryFilePath.url)
     const userId = req.user.result._id;
     //update user in mongodb with user profile
     const result = await userModel.updateOne(
        {_id:userId},
        {$set:{profileImage:cloudinaryFilePath.url}}
     )
     console.log("profile updated")
    res.status(200).send({cloudinaryUrl:cloudinaryFilePath.url,
        result:result
    })
}
